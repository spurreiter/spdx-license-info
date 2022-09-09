#!/usr/bin/env bash

CWD=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

build () {
	cd "$CWD/.."
	node "$CWD/extract.js"
	npm run lint -- --fix
}

test ! -d "$CWD/../assets/license-list-XML" && "$CWD/clone.sh"

cat "$CWD/../assets/license-list-XML/RELEASE-NOTES.md" | grep version | head -n 1

build
