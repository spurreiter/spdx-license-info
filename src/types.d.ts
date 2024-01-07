/**
 * publicDomain - is in the public domain
 * permissive - permissive term
 * copyleft - copyleft terms apply
 * restricted - check license terms
 * illicit - not allowed
 */
export type Term = 'publicDomain'|'permissive'|'copyleft'|'restricted'|'illicit'

export interface LicenseTerms {
  /** copyright notice must be attributed and preserved in distribution or modified work or copy*/
  attribution?: boolean
  /** linking of the licensed code with code licensed under a different license (e.g. when the code is provided as a library) */
  linking?: Term
  /** distribution of the code to third parties */
  distribution?: Term
  /** modification of the code by a licensee */
  modification?: Term
  /** whether modified code may be licensed under a different license (for example a copyright) or must retain the same license under which it was provided */
  sublicensing?: Term
  /** whether modification to the code must be shared with the community (privateUse=false) or may be used privately (e.g. internal use by a corporation) */
  privateUse?: boolean
  /** protection of licensees from patent claims made by code contributors regarding their contribution, and protection of contributors from patent claims made by licensees */
  patentGrant?: boolean
  /** use of trademarks associated with the licensed code or its contributors by a licensee */
  trademarkGrant?: boolean
  /**
   * magnetUri's from
   * - https://www.gnu.org/software/librejs/free-your-javascript.html
   * - https://www.gnu.org/software/librejs/manual/html_node/Setting-Your-JavaScript-Free.html#License-tags
   */
  magnetUri?: string
  /** optional note */
  note?: string
}

export type SPDXcode = string

/**
 * @see https://github.com/spdx/license-list-XML/blob/main/DOCS/license-fields.md
 */
export interface LicenseInfo extends LicenseTerms {
  /** SPDX code */
  spdxId: SPDXcode
  /** SPDX short identifier */
  referenceNumber?: number
  /** license name */
  name: string
  /** license url */
  url?: string
  /** [OSI](https://opensource.org/licenses) approved license */
  isOsiApproved?: boolean
  /** Listed as free by the [FSF](https://www.gnu.org/licenses/license-list.en.html) */
  isFsfLibre?: boolean
  /** deprecated license id */
  isDeprecated?: boolean
  /** license text */
  licenseText?: string
}

export interface LicenseIds {
  [licenseId: string]: LicenseInfo
}
