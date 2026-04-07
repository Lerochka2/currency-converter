module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  reporters: [
    'default',
    ['./allure-reporter.js', { outputDir: './allure-results' }]
  ],
};