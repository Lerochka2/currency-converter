document.getElementById('convertBtn').addEventListener('click', async () => {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    resultDiv.textContent = '';
    errorDiv.textContent = '';

    if (!amount) {
        errorDiv.textContent = 'Введите сумму';
        errorDiv.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('/api/convert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ from: fromCurrency, to: toCurrency, amount: parseFloat(amount) })
        });
        const data = await response.json();
        if (response.ok) {
            resultDiv.textContent = `${amount} ${fromCurrency} = ${data.result.toFixed(2)} ${toCurrency}`;
            resultDiv.style.display = 'block';
        } else {
            errorDiv.textContent = data.error;
            errorDiv.style.display = 'block';
        }
    } catch (err) {
        errorDiv.textContent = 'Ошибка соединения с сервером';
        errorDiv.style.display = 'block';
    }
});