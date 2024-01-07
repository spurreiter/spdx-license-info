import { deepEqual } from 'assert'
import { licenseTexts } from '../src/index.js'
import { normalize, licenseChecks } from '../src/licenseDetect.js'

const texts = {}
for (const [id, { licenseText }] of Object.entries(licenseTexts)) {
  texts[id] = normalize(licenseText)
}

const expects = {
  'AGPL-1.0': ['AGPL-1.0', 'AGPL-1.0-only', 'AGPL-1.0-or-later'],
  'AGPL-1.0-only': ['AGPL-1.0', 'AGPL-1.0-only', 'AGPL-1.0-or-later'],
  'AGPL-1.0-or-later': ['AGPL-1.0', 'AGPL-1.0-only', 'AGPL-1.0-or-later'],
  'AGPL-3.0': ['AGPL-3.0', 'AGPL-3.0-only', 'AGPL-3.0-or-later'],
  'AGPL-3.0-only': ['AGPL-3.0', 'AGPL-3.0-only', 'AGPL-3.0-or-later'],
  'AGPL-3.0-or-later': ['AGPL-3.0', 'AGPL-3.0-only', 'AGPL-3.0-or-later']
}

describe.only('licenseDetect', function () {
  Object.keys(licenseChecks).forEach((spdxId) => {
    it('' + spdxId, function () {
      const fn = licenseChecks[spdxId]
      if (fn('') === undefined) {
        return
      }
      const matching = []
      for (const [id, text] of Object.entries(texts)) {
        const matches = fn(text)
        if (matches) matching.push(id)
      }
      deepEqual(matching, expects[spdxId] || [spdxId])
    })
  })
})
