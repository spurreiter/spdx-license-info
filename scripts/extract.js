import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import fsp from 'fs/promises'
import { glob } from 'glob'
import { promisify } from 'util'
import { toJs } from 'xml-vs-js'
import { licenseInfo } from '../data/licenseInfo.js'

const log = console
const __dirname = dirname(fileURLToPath(import.meta.url))

const difference = (keys, otherKeys) => {
  const values = Object.keys(otherKeys)
  return Object.keys(keys).filter((value) => !values.includes(value))
}

const toText = (text) => (Array.isArray(text) ? text.join('') : text)

const keysToBool = (obj) =>
  !obj
    ? {}
    : Object.entries(obj).reduce((o, [k, v]) => {
      if (v === 'true') {
        o[k] = true
      } else if (v === 'false') {
        o[k] = false
      } else {
        o[k] = v
      }
      return o
    }, {})

const obsoletedByToArray = (obsoletedBy) =>
  Array.isArray(obsoletedBy)
    ? obsoletedBy.map((item) => item._text)
    : obsoletedBy && [obsoletedBy._text]

async function extractLicenseInfo (filename) {
  const str = await fsp.readFile(filename, 'utf8')
  const obj = await promisify(toJs)(str, { elems: false })
  const info = keysToBool(obj?.SPDXLicenseCollection?.license?._attrs)
  const obsoletedBy = obsoletedByToArray(
    obj?.SPDXLicenseCollection?.license?.obsoletedBys?.obsoletedBy
  )
  const url = toText(
    obj?.SPDXLicenseCollection?.license?.crossRefs?.crossRef?.[0]?._text ||
      obj?.SPDXLicenseCollection?.license?.crossRefs?.crossRef?._text
  )
  return { ...info, obsoletedBy, url }
}

async function writeLicenseIds (licenseIds, filename) {
  const str = `/*
 * THIS IS A GENERATED FILE - DO NOT EDIT!
 */
/**
 * @type {import('./types').LicenseIds} LicenseIds
 */
export const licenseIds = ${JSON.stringify(licenseIds, null, 2)}`
  await fsp.writeFile(filename, str, 'utf8')
}

async function writeLicenseIdsJson (licenseIds, filename) {
  await fsp.writeFile(filename, JSON.stringify(licenseIds, null, 2), 'utf8')
}

async function main () {
  const licenseFiles = await promisify(glob)(
    resolve(__dirname, '../assets/license-list-XML/src/*.xml')
  )
  const finalFile = resolve(__dirname, '../index.js')
  const finalFileJson = resolve(__dirname, '../licenses.json')

  const licenseIds = {}
  for (const licenseFile of licenseFiles) {
    const { licenseId, name, ...other } = await extractLicenseInfo(licenseFile)
    if (!licenseId) {
      log.error(`No licenseId found in file ${licenseFile}`)
    } else if (!licenseInfo[licenseId]) {
      const msg = `Missing licenseInfo for licenseId ${licenseId}`
      const { url } = other
      log.error(msg)
      log.error(JSON.stringify({ [licenseId]: { url } }))
    } else {
      const { url, ...details } = licenseInfo[licenseId] || []
      licenseIds[licenseId] = { spdx: licenseId, name, ...details, ...other }
    }
  }

  const onlyInLicInfo = difference(licenseInfo, licenseIds)
  if (onlyInLicInfo.length) {
    log.info(`LicenseInfos only in licenseInfo [${onlyInLicInfo}]`)
  }

  // log.info(licenseIds)
  await writeLicenseIds(licenseIds, finalFile)
  await writeLicenseIdsJson(licenseIds, finalFileJson)
}

main().catch(log.error)
