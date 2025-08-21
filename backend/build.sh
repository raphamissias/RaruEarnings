#!/usr/bin/env bash
#exit on error
set -o errexit

npm install
npm run build
chmod +x ./node_modules/.bin/typeorm
npx typeorm migration:run -d dist/data-source.js