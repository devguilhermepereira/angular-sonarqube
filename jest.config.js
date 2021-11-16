const {pathsToModuleNameMapper} = require('ts-jest/utils');
const {compilerOptions} = require('./tsconfig');

module.exports = {
  globals: {
    "ts-jest": {
      skipBabel: true,
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: '\\.(html|svg)$'
    },
  },
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
  })
};
