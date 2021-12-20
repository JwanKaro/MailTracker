/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/tests/**/*.test.js',
    '<rootDir>/tests/**/*.test.ts',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest',
    "^.+\\.(j|t)sx?$": "ts-jest"

  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node',
    'ts',
    'tsx',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  globalSetup: 
    '<rootDir>/tests/main.setup.ts'
}
