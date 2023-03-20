import type { Config } from 'jest'

const config: Config = {
  verbose: true,

  // Set the root directory
  rootDir: '.',

  // Tell Jest to use TypeScript
  preset: 'ts-jest',

  // Collect coverage information for each package
  collectCoverageFrom: ['packages/*/src/**/*.ts'],

  // Specify the packages directory
  // testMatch: ['<rootDir>/packages/*/test/**/*.test.ts'],
}

export default config
