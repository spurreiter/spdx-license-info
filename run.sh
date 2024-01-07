#!/usr/bin/env bash

CWD=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd "$CWD"

REPO=https://github.com/spdx/license-list-data
TAG=v3.22

# ... general ...

function tags {
	git ls-remote --sort='version:refname' --tags $REPO \
		| grep -v "{}" \
		| tail -n 3
}

function clone {
	cd "$CWD"/assets
	test -d license-list-data && rm -rf license-list-data
	git clone --depth 1 --branch $TAG $REPO
	cd "$CWD"
}

function build {
	test ! -d "$CWD"/../assets/license-list-data && clone
	node "$CWD/extract.js"
	npm run lint -- --fix
}

# ... ignition ...

function help {
	# declare -F does not works in zsh!
	declare -F | sed -e 's/declare -f /    /; /    _[a-z]/d'
}

if test -z "$1"; then
	help
else
	$1 ${*:2}
fi
