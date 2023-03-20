import type { Config } from 'jest'

const config: Config = {
  verbose: true,

  // Set the root directory
  rootDir: '.',

  // Tell Jest to use TypeScript
  preset: 'ts-jest',

  // Specify the test directory for this package
  // testMatch: ['<rootDir>/test/**/*.test.ts'],

  // Add any additional configuration for this package
}

export default config
