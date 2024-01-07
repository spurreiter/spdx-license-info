import { writeFile } from 'fs/promises'
// import { licenseIds } from '../src/index.js'
import { licenseTexts } from '../src/index.js'
import { normalize } from '../src/licenseDetect.js'

const out = {}

// for (const k of Object.keys(licenseIds)) {
//   out[k] = 'todo'
// }

for (const k of Object.keys(licenseTexts)) {
  const t = licenseTexts[k].licenseText
  out[k] = `(t) => t.includes(\`${normalize(t)}\`)`
}

await writeFile(
  new URL('./x.json', import.meta.url),
  JSON.stringify(out, null, 2),
  'utf-8'
)
