//Этот класс реализует паттерн Page Object Model способ найти элемент на странице
//оторый выносит всю логику взаимодействия с веб‑страницей в отдельный класс
//Тесты используют только методы этого класса и не знают, как устроена HTML‑разметка
class CurrencyConverterPage {
    constructor(page) {
        this.page = page;
        this.fromCurrencySelect = '#fromCurrency';
        this.toCurrencySelect = '#toCurrency';
        this.amountInput = '#amount';
        this.convertButton = '#convertBtn';
        this.resultDiv = '#result';
        this.errorDiv = '#error';
    }
    async navigate() {
        await this.page.goto('/');
    }
    async selectFromCurrency(currency) {
        await this.page.selectOption(this.fromCurrencySelect, currency);
    }
    async selectToCurrency(currency) {
        await this.page.selectOption(this.toCurrencySelect, currency);
    }
    async enterAmount(amount) {
        await this.page.fill(this.amountInput, String(amount));
    }
    async clickConvert() {
        await this.page.click(this.convertButton);
    }
    async getResultText() {
        await this.page.waitForSelector(this.resultDiv, { state: 'visible' });
        return this.page.textContent(this.resultDiv);
    }
    async getErrorText() {
        await this.page.waitForSelector(this.errorDiv, { state: 'visible' });
        return this.page.textContent(this.errorDiv);
    }
    async isResultVisible() {
        return this.page.isVisible(this.resultDiv);
    }
    async isErrorVisible() {
        return this.page.isVisible(this.errorDiv);
    }
}
module.exports = CurrencyConverterPage;