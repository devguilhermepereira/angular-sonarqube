#!/bin/bash

npm install

# use Angular CLI to trigger a test run so we have coverage data
# ./node_modules/.bin/ng test --code-coverage
npx jest --coverage

# call the sonar scanner
sonar-scanner -Dsonar.host.url=http://localhost:9000/ -Dsonar.login=c0bb45702bad3ec5fcd08d4998d3775d77728130
