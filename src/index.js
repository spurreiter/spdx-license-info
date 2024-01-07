/**
 * @typedef {import('./types').Term} Term
 * @typedef {import('./types').LicenseTerms} LicenseTerms
 * @typedef {import('./types').SPDXcode} SPDXcode
 * @typedef {import('./types').LicenseInfo} LicenseInfo
 * @typedef {import('./types').LicenseIds} LicenseIds
 */

export { licenseIds } from './licenseIds.js'
export { licenseTexts } from './licenseTexts.js'
export { licenseDetect } from './licenseDetect.js'
export { exceptionIds } from './exceptionIds.js'
export { parse, sanitize, UNKNOWN } from './sanitize.js'
export {
  isLicenseId,
  isDeprecatedLicenseId,
  isExceptionId,
  isDeprecatedExeptionId
} from './checks.js'
