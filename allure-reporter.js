const fs = require('fs');
const path = require('path');

class AllureReporter {
  constructor(globalConfig, options) {
    this._options = options;
    this._resultsDir = options.outputDir || './allure-results';
    if (!fs.existsSync(this._resultsDir)) {
      fs.mkdirSync(this._resultsDir, { recursive: true });
    }
  }

  onTestResult(test, testResult) {
    const { testResults } = testResult;
    testResults.forEach(result => {
      const status = result.status === 'passed' ? 'passed' : 'failed';
      // Безопасное получение имени файла
      let suiteName = 'unknown';
      if (test && test.testFilePath) {
        suiteName = path.basename(test.testFilePath);
      }
      const allureResult = {
        name: result.title,
        status: status,
        start: Date.now(),
        stop: Date.now(),
        stage: 'finished',
        description: result.fullName || result.title,
        labels: [{ name: 'suite', value: suiteName }],
      };
      const fileName = `result-${Date.now()}-${Math.random().toString(36).substr(2, 8)}.json`;
      fs.writeFileSync(
        path.join(this._resultsDir, fileName),
        JSON.stringify(allureResult, null, 2)
      );
    });
  }
}

module.exports = AllureReporter;