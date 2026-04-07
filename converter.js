const ratesToBYN = {
  USD: 3.2,
  EUR: 3.5,
  RUB: 0.035,
  BYN: 1,
};

function convert(from, to, amount) {
  if (from === to) return amount;
  const amountInBYN = amount * ratesToBYN[from];
  return amountInBYN / ratesToBYN[to];
}

module.exports = {
  ratesToBYN,
  convert,
};
