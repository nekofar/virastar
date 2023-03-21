import type { Config } from 'jest'

const config: Config = {
  // Set the root directory
  rootDir: '.',

  // Set the `projects` property to an array of paths to the `jest.config.ts` files in the packages
  projects: [
    '<rootDir>/packages/core', // Path the `core` package
    '<rootDir>/packages/cli', // Path the `cli` package
  ],
}

export default config
