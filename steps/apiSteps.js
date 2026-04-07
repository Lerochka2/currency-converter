const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const app = require('../server');

Given('API конвертера доступен', function () {
  this.client = request(app);
});

When(
  'я отправляю запрос на конвертацию из {string} в {string} с суммой {float}',
  async function (from, to, amount) {
    this.response = await this.client.post('/api/convert').send({ from, to, amount });
  }
);

Then('ответ содержит результат {float}', function (expectedResult) {
  assert.strictEqual(this.response.status, 200);
  assert.strictEqual(this.response.body.result, expectedResult);
});

Then('ответ содержит ошибку {string}', function (expectedMessage) {
  assert.strictEqual(this.response.status, 400);
  assert.strictEqual(this.response.body.error, expectedMessage);
});
