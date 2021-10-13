module.exports = {
    moduleDirectories: [
        'node_modules',
        __dirname
    ],
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>src/tests/setup.js']
  }
  