# spdx-license-info

> Information on [SPDX license](https://spdx.org/licenses/) terms.

Uses [SPDX License List][] version 3.18 - 2022-08-11

## install 

```
npm install spdx-license-info
```

## usage 

```js
import { licenseIds } from 'spdx-license-info'

console.log(licenseIds.Unlicense)
//> {
//>   spdx: 'Unlicense',
//>   name: 'The Unlicense',
//>   preserveCopyright: false,
//>   linking: 'publicDomain',
//>   distribution: 'publicDomain',
//>   modification: 'publicDomain',
//>   sublicensing: 'publicDomain',
//>   patentGrant: false,
//>   privateUse: true,
//>   trademarkGrant: false,
//>   magnetUri: 'magnet:?xt=urn:btih:5ac446d35272cc2e4e85e4325b146d0b7ca8f50c&dn=unlicense.txt',
//>   isOsiApproved: true,
//>   url: 'https://unlicense.org/'
//> }
```

see [`types.d.ts`](./types.d.ts) for attribute definitions.

## contributing

The project is in its infancy. Not for all licenses the full license info and its 
(desired) attributes are available.

Please edit `scripts/licenseInfo.js` after reading the license under the provided url 
and attribute the license info.

The final file is generated with `npm run build`.  
Pull-Requests are welcome.

## license 

[The Unlicense](https://unlicense.org)

[SPDX License List]: https://github.com/spdx/license-list-XML
