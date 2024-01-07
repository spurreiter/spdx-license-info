import { licenseIds } from './licenseIds.js'
import { exceptionIds } from './exceptionIds.js'

/**
 * @param {string} spdxId
 * @returns {boolean}
 */
export const isLicenseId = (spdxId) => !!licenseIds[spdxId]

/**
 * @param {string} spdxId
 * @returns {boolean|undefined}
 */
export const isDeprecatedLicenseId = (spdxId) => licenseIds[spdxId]?.isDeprecated

/**
 * @param {string} spdxId
 * @returns {boolean}
 */
export const isExceptionId = (spdxId) => !!exceptionIds[spdxId]

/**
 * @param {string} spdxId
 * @returns {boolean|undefined}
 */
export const isDeprecatedExeptionId = (spdxId) => exceptionIds[spdxId]?.isDeprecated
