const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const resultEl = document.getElementById('result');
const convertBtn = document.getElementById('convert-btn');

const currencies = ["USD","EUR","GBP","BRL","JPY","AUD","CAD","CHF","CNY","INR"];

function populateCurrencies() {
  currencies.forEach(curr => {
    const option1 = document.createElement('option');
    option1.value = curr;
    option1.text = curr;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = curr;
    option2.text = curr;
    toCurrency.appendChild(option2);
  });
  fromCurrency.value = 'USD';
  toCurrency.value = 'EUR';
}

async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount)) {
    resultEl.textContent = 'Please enter a valid amount';
    return;
  }
  const from = fromCurrency.value;
  const to = toCurrency.value;
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    const result = amount * rate;
    resultEl.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
  } catch (error) {
    resultEl.textContent = 'Error fetching exchange rate';
  }
}

populateCurrencies();
convertBtn.addEventListener('click', convertCurrency);
