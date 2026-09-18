#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist/libraries

cp index.html dist/index.html
cp libraries/*.xml dist/libraries/

echo "Prepared ArtPriz Constructor static assets:"
find dist -maxdepth 2 -type f -print
