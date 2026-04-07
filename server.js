const express = require('express');
const { ratesToBYN, convert } = require('./converter');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/convert', (req, res) => {
  const { from, to, amount } = req.body;

  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    return res.status(400).json({ error: 'Сумма должна быть числом' });
  }
  if (amount < 0) {
    return res.status(400).json({ error: 'Сумма не может быть отрицательной' });
  }
  if (!ratesToBYN[from] || !ratesToBYN[to]) {
    return res.status(400).json({ error: 'Неподдерживаемая валюта' });
  }

  const result = convert(from, to, amount);
  return res.json({ result });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
  });
}

module.exports = app;