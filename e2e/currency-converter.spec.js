//содержит UI-тесты для конвертера валют
//Использует Page Object для взаимодействия со страницей
//Реализует Data-Driven подход – тесты генерируются из массивов данных
const { test, expect } = require('@playwright/test');
const CurrencyConverterPage = require('./pages/CurrencyConverterPage');
test.describe('Конвертер валют', () => {
    let page;
    let converterPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        converterPage = new CurrencyConverterPage(page);
        await converterPage.navigate();
    });

    test.afterEach(async () => {
        await page.close();
    });
    const conversionPairs = [
        { from: 'USD', to: 'BYN', amount: 100, expected: '100 USD = 320.00 BYN' },
        { from: 'EUR', to: 'BYN', amount: 100, expected: '100 EUR = 350.00 BYN' },
        { from: 'RUB', to: 'BYN', amount: 100, expected: '100 RUB = 3.50 BYN' },
        { from: 'BYN', to: 'EUR', amount: 100, expected: '100 BYN = 28.57 EUR' }
    ];
    for (const { from, to, amount, expected } of conversionPairs) {
        test(`Конвертация ${from} -> ${to} с суммой ${amount}`, async () => {
            await converterPage.selectFromCurrency(from);
            await converterPage.selectToCurrency(to);
            await converterPage.enterAmount(amount);
            await converterPage.clickConvert();

            const result = await converterPage.getResultText();
            expect(result).toBe(expected);
            expect(await converterPage.isErrorVisible()).toBe(false);
        });
    }
    const amounts = [0, 100, 1000.50];
    for (const amount of amounts) {
        test(`Конвертация USD -> BYN (проверка суммы ${amount})`, async () => {
            await converterPage.selectFromCurrency('USD');
            await converterPage.selectToCurrency('BYN');
            await converterPage.enterAmount(amount);
            await converterPage.clickConvert();

            const result = await converterPage.getResultText();
            const expectedValue = (amount * 3.2).toFixed(2);
            expect(result).toBe(`${amount} USD = ${expectedValue} BYN`);
        });
    }
});
test.describe('Негативные сценарии', () => {
    let page;
    let converterPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        converterPage = new CurrencyConverterPage(page);
        await converterPage.navigate();
    });

    test.afterEach(async () => {
        await page.close();
    });

    test('Отрицательная сумма', async () => {
        await converterPage.selectFromCurrency('USD');
        await converterPage.selectToCurrency('BYN');
        await converterPage.enterAmount(-50);
        await converterPage.clickConvert();

        const error = await converterPage.getErrorText();
        expect(error).toContain('Сумма не может быть отрицательной');
    });

    test('Конвертация валюты в саму себя', async () => {
        await converterPage.selectFromCurrency('USD');
        await converterPage.selectToCurrency('USD');
        await converterPage.enterAmount(100);
        await converterPage.clickConvert();

        const result = await converterPage.getResultText();
        expect(result).toBe('100 USD = 100.00 USD');
    });
});