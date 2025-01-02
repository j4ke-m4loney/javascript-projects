// Initial price of the item
let price = 3.26;

// Cash-in-drawer (CID): 2D array of currency denomination and total amount available
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// UI elements
const displayChangeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('price-screen');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');

// Formats the results (status and change) into readable HTML and updates the UI
const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
  displayChangeDue.innerHTML += change
    .map(
      ([denominationName, amount]) => `<p>${denominationName}: $${amount}</p>`
    )
    .join('');
};

// Core function to calculate and process change due
const checkCashRegister = () => {
  // Convert cash and price values to cents to avoid floating-point issues
  const cashInCents = Math.round(Number(cash.value) * 100);
  const priceInCents = Math.round(price * 100);

  // If the customer doesn't provide enough money, alert and reset input
  if (cashInCents < priceInCents) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  // If the customer provides exact cash, display no change is due
  if (cashInCents === priceInCents) {
    displayChangeDue.innerHTML =
      '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }

  // Calculate the amount of change due
  let changeDue = cashInCents - priceInCents;

  // Reverse CID for easier calculation (highest denomination first)
  const reversedCid = [...cid]
    .reverse()
    .map(([denominationName, amount]) => [
      denominationName,
      Math.round(amount * 100)
    ]);

  // Currency denominations in cents
  const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];

  // Prepare result object to store status and change breakdown
  const result = { status: 'OPEN', change: [] };

  // Calculate the total amount available in the drawer
  const totalCID = reversedCid.reduce((prev, [_, amount]) => prev + amount, 0);

  // If the total CID is less than the change due, mark insufficient funds
  if (totalCID < changeDue) {
    displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  // If total CID matches the change due, mark status as CLOSED
  if (totalCID === changeDue) {
    result.status = 'CLOSED';
  }

  // Loop through each denomination and calculate change
  for (let i = 0; i < reversedCid.length; i++) {
    if (changeDue >= denominations[i] && changeDue > 0) {
      const [denominationName, total] = reversedCid[i];
      const possibleChange = Math.min(total, changeDue);
      const count = Math.floor(possibleChange / denominations[i]);
      const amountInChange = count * denominations[i];
      changeDue -= amountInChange;

      // Add denomination to the change result if any is used
      if (count > 0) {
        result.change.push([denominationName, amountInChange / 100]);
      }
    }
  }

  // If there's still change due after processing, mark insufficient funds
  if (changeDue > 0) {
    displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  // Display the formatted results in the UI
  formatResults(result.status, result.change);

  // Update the cash drawer with the new amounts
  updateUI(result.change);
};

// Function to validate input and trigger the cash register logic
const checkResults = () => {
  if (!cash.value) {
    return; // Do nothing if no input
  }
  checkCashRegister();
};

// Updates the cash drawer UI and recalculates remaining cash
const updateUI = change => {
  // Map of denomination names for display
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };

  // Update CID based on change given
  if (change) {
    change.forEach(([changeDenomination, changeAmount]) => {
      const targetArr = cid.find(
        ([denominationName]) => denominationName === changeDenomination
      );
      targetArr[1] =
        (Math.round(targetArr[1] * 100) - Math.round(changeAmount * 100)) / 100;
    });
  }

  // Reset input field and update drawer and price displays
  cash.value = '';
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
      .map(
        ([denominationName, amount]) =>
          `<p>${currencyNameMap[denominationName]}: $${amount}</p>`
      )
      .join('')}
  `;
};

// Event listener for purchase button
purchaseBtn.addEventListener('click', checkResults);

// Allow pressing Enter to trigger the cash register logic
cash.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});

// Initial UI update to display starting cash drawer
updateUI();