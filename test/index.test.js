import { equal } from 'assert'
import { licenseIds, exceptionIds, licenseTexts } from '../src/index.js'

describe('licenseIds', function () {
  it('shall get MIT license', function () {
    equal(licenseIds.MIT.name, 'MIT License')
  })
})

describe('exceptionIds', function () {
  it('shall get LLGPL', function () {
    equal(exceptionIds.LLGPL.name, 'LLGPL Preamble')
  })
})

describe('licenseTexts', function () {
  it('shall get TMate', function () {
    equal(
      licenseTexts.TMate.licenseText.slice(0, 50),
      'The TMate Open Source License.\n\nThis license appli'
    )
  })
})
