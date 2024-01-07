import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { writeFile, readFile } from 'fs/promises'
import { glob } from 'glob'

import { licenseInfo as licenseInfoInp } from '../data/licenseInfo.js'

const log = console
const __dirname = dirname(fileURLToPath(import.meta.url))

async function readJsonFile (filename) {
  const content = await readFile(filename, 'utf-8')
  return JSON.parse(content)
}

async function writeJsFile (
  filename,
  data,
  { header = '', variable = 'm' } = {}
) {
  const content = `${header}export const ${variable} = ${JSON.stringify(
    data,
    null,
    2
  )}`
  return await writeFile(filename, content, 'utf-8')
}

const sorter = (a, b) => a.localeCompare(b)

function sortObjectKeys (obj) {
  const n = {}
  for (const k of Object.keys(obj).sort(sorter)) {
    n[k] = obj[k]
  }
  return n
}

const orderLicenseKeys = (obj) => {
  const {
    spdxId,
    name,
    referenceNumber,
    isDeprecated,
    isFsfLibre,
    isOsiApproved,
    ...rest
  } = obj
  const ordered = Object.keys(rest)
    .sort()
    .reduce((acc, k) => {
      acc[k] = obj[k]
      return acc
    }, {})
  return {
    spdxId,
    name,
    referenceNumber,
    isDeprecated,
    isFsfLibre,
    isOsiApproved,
    ...ordered
  }
}

const licenseIdsHeader = ({ licenseListVersion }) => `/*
 * THIS IS A GENERATED FILE - DO NOT EDIT!
 * licenseListVersion=${licenseListVersion}
 */
/**
 * @type {import('./types').LicenseIds} LicenseIds
 */
`
const licenseTextsHeader = ({ licenseListVersion }) => `/* eslint no-multi-str: "off" */
/*
 * THIS IS A GENERATED FILE - DO NOT EDIT!
 * licenseListVersion=${licenseListVersion}
 */
`

async function procLicenses () {
  const { licenseListVersion, licenses } = await readJsonFile(
    resolve(__dirname, '..', 'assets/license-list-data/json/licenses.json')
  )

  const lMap = new Map()
  for (const l of licenses) {
    lMap.set(l.licenseId, l)
  }

  const info = {}
  const texts = {}

  const detailFiles = await glob(
    resolve(__dirname, '..', 'assets/license-list-data/json/details/*.json')
  )

  for (const file of detailFiles) {
    const details = await readJsonFile(file)
    const {
      isDeprecatedLicenseId: isDeprecated,
      isOsiApproved,
      isFsfLibre,
      licenseText,
      name,
      licenseId,
      seeAlso
    } = details
    const { referenceNumber } = lMap.get(licenseId) || {}
    const url = seeAlso?.[0]

    if (!licenseInfoInp[licenseId]) {
      log.warn('new license id=%s', licenseId)
      licenseInfoInp[licenseId] = { url }
    }
    info[licenseId] = orderLicenseKeys({
      ...licenseInfoInp[licenseId],
      spdxId: licenseId,
      referenceNumber,
      name,
      url,
      isDeprecated,
      isFsfLibre,
      isOsiApproved
    })
    texts[licenseId] = { licenseText }
  }

  await writeJsFile(
    resolve(__dirname, '..', 'data/new.js'),
    sortObjectKeys(licenseInfoInp)
  )

  await writeJsFile(
    resolve(__dirname, '..', 'src/licenseIds.js'),
    sortObjectKeys(info),
    { variable: 'licenseIds', header: licenseIdsHeader({ licenseListVersion }) }
  )

  await writeJsFile(
    resolve(__dirname, '..', 'src/licenseTexts.js'),
    sortObjectKeys(texts),
    {
      variable: 'licenseTexts',
      header: licenseTextsHeader({ licenseListVersion })
    }
  )
}

async function procExceptions () {
  const { licenseListVersion, exceptions } = await readJsonFile(
    resolve(__dirname, '..', 'assets/license-list-data/json/exceptions.json')
  )

  const info = {}

  for (const e of exceptions) {
    const {
      licenseExceptionId,
      isDeprecatedLicenseId: isDeprecated,
      name,
      referenceNumber,
      seeAlso
    } = e
    const url = seeAlso?.[0]
    info[licenseExceptionId] = {
      spdxId: licenseExceptionId,
      name,
      referenceNumber,
      isDeprecated,
      url
    }
  }

  await writeJsFile(
    resolve(__dirname, '..', 'src/exceptionIds.js'),
    sortObjectKeys(info),
    {
      variable: 'exceptionIds',
      header: licenseIdsHeader({ licenseListVersion })
    }
  )
}

async function main () {
  await procLicenses()
  await procExceptions()
}

main().catch(log.error)
