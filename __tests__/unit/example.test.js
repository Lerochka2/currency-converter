const { convert } = require('../../converter');

describe('Конвертация валют (unit)', () => {
  test('USD -> BYN рассчитывается корректно', () => {
    expect(convert('USD', 'BYN', 100)).toBe(320);
  });

  test('Конвертация в ту же валюту возвращает исходную сумму', () => {
    expect(convert('EUR', 'EUR', 50)).toBe(50);
  });
});
