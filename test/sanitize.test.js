import { equal } from 'assert/strict'
import { sanitize } from '../src/index.js'

describe('sanitize', function () {
  it('empty', function () {
    equal(sanitize(), 'Unknown')
  })

  it('MIT', function () {
    equal(sanitize('MIT'), 'MIT')
  })

  it('MIT-OR-CC (fails)', function () {
    equal(sanitize('MIT-OR-CC'), 'Unknown')
  })

  it('(MIT OR ISC)', function () {
    equal(sanitize('(MIT OR ISC)'), '(MIT OR ISC)')
  })

  it('CDDL-1.0+', function () {
    equal(sanitize('CDDL-1.0+'), 'CDDL-1.0+')
  })

  it('CDDM-1.1+ (fails)', function () {
    equal(sanitize('CDDM-1.1+'), 'Unknown')
  })

  it('Foobar OR MIT (fails)', function () {
    equal(sanitize('Foobar OR MIT'), 'Unknown')
  })

  it('LGPL-2.1-only OR MIT', function () {
    equal(sanitize('LGPL-2.1-only OR MIT'), 'LGPL-2.1-only OR MIT')
  })

  it('LGPL-2.1-only OR MIT OR BSD-3-Clause', function () {
    equal(
      sanitize('LGPL-2.1-only  OR    MIT OR BSD-3-Clause'),
      'LGPL-2.1-only OR MIT OR BSD-3-Clause'
    )
  })

  it('LGPL-2.1-only AND MIT', function () {
    equal(sanitize('(LGPL-2.1-only AND MIT)'), '(LGPL-2.1-only AND MIT)')
  })

  it('GPL-2.0-or-later WITH Bison-exception-2.2', function () {
    equal(
      sanitize('GPL-2.0-or-later WITH Bison-exception-2.2'),
      'GPL-2.0-or-later WITH Bison-exception-2.2'
    )
  })

  it('GPL-2.0-or-later WITH Bison-exception (fails)', function () {
    equal(sanitize('GPL-2.0-or-later WITH Bison-exception'), 'Unknown')
  })
})
