const {pathsToModuleNameMapper} = require('ts-jest/utils');
const {compilerOptions} = require('./tsconfig');

module.exports = {
  preset: './jest.preset.js',
  roots: ['<rootDir>/src/'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  collectCoverage: true,
  testResultsProcessor: "jest-sonar-reporter",
  coverageReporters: ["json", "lcov"],
  coverageDirectory: 'coverage',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
  }),
  resolver: 'jest-node-exports-resolver',
  // set the value to the custom resolver created in step 1
  // resolver: '<rootDir>/my-module-resolve.js',
  // // browser bundles in firebase are ESM, transform them to CJS to work in Jest
  // transformIgnorePatterns: [
  //   "<rootDir>/node_modules/(?!(@firebase.*)/)"
  // ]
};
