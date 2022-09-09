#!/usr/bin/env bash

CWD=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

clone () {
	cd "$CWD/../assets"
	test -d license-list-XML && rm -rf license-list-XML
	git clone --depth 2 https://github.com/spdx/license-list-XML
}

clone
