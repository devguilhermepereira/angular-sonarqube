#!/bin/bash

npm install

# use Angular CLI to trigger a test run so we have coverage data
# ./node_modules/.bin/ng test --code-coverage
npx jest --code-coverage

# call the sonar scanner
sonar-scanner -Dsonar.host.url=http://localhost:9000/ -Dsonar.login=9f5e558205eba874d32f8eac02707d9cc3715954