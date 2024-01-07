import { isLicenseId, isExceptionId } from './checks.js'

export const UNKNOWN = 'Unknown'
const WITH = 'WITH'
const OPS = [WITH, 'AND', 'OR']
const BRACKETS = ['(', ')']

/**
 * @param {string} spdxId
 * @returns {string[]}
 */
export const parse = (spdxId) => {
  if (!spdxId) {
    return [UNKNOWN]
  }
  const parts = spdxId.trim().split(/\s+|([()])/)
  const rule = []
  let lastOp
  let i = 0
  for (const part of parts) {
    if (!part) continue
    const isEven = i % 2 === 0
    if (BRACKETS.includes(part)) {
      rule.push(part)
    } else if (isEven) {
      const id = part[part.length - 1] === '+' ? part.slice(0, -1) : part
      if (lastOp === WITH ? isExceptionId(part) : isLicenseId(id)) {
        rule.push(part)
        i++
      } else {
        return [UNKNOWN]
      }
    } else if (!isEven && OPS.includes(part)) {
      rule.push(part)
      lastOp = part
      i++
    } else {
      return [UNKNOWN]
    }
  }
  return rule
}

/**
 * @param {string} spdxId
 * @returns {string}
 */
export const sanitize = (spdxId) => {
  const rule = parse(spdxId)
  return rule.join(' ').replace(/\(\s/g, '(').replace(/\s\)/g, ')')
}
