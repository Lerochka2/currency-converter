module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['steps/**/*.js'],
    format: ['progress', 'json:allure-results/cucumber.json'],
  },
};
