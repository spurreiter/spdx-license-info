import { equal } from 'assert'
import {
  isLicenseId,
  isDeprecatedLicenseId,
  isExceptionId,
  isDeprecatedExeptionId
} from '../src/index.js'

describe('checks', function () {
  describe('isLicenseId', function () {
    it('AGPL-1.0-only', function () {
      equal(isLicenseId('AGPL-1.0-only'), true)
    })

    it('not-exists fails', function () {
      equal(isLicenseId('not-exists'), false)
    })
  })

  describe('isDeprecatedLicenseId', function () {
    it('AGPL-1.0', function () {
      equal(isDeprecatedLicenseId('AGPL-1.0'), true)
    })

    it('AGPL-1.0-only', function () {
      equal(isDeprecatedLicenseId('AGPL-1.0-only'), false)
    })

    it('not-exists', function () {
      equal(isDeprecatedLicenseId('not-exists'), undefined)
    })
  })

  describe('isExceptionId', function () {
    it('Nokia-Qt-exception-1.1', function () {
      equal(isExceptionId('Nokia-Qt-exception-1.1'), true)
    })

    it('not-exists-exception fails', function () {
      equal(isExceptionId('not-exists-exception'), false)
    })
  })

  describe('isDeprecatedExeptionId', function () {
    it('Nokia-Qt-exception-1.1', function () {
      equal(isDeprecatedExeptionId('Nokia-Qt-exception-1.1'), true)
    })

    it('LZMA-exception fails', function () {
      equal(isDeprecatedExeptionId('LZMA-exception'), false)
    })

    it('not-exists-exception fails', function () {
      equal(isDeprecatedExeptionId('not-exists-exception'), undefined)
    })
  })
})
