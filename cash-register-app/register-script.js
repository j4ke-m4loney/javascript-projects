let price = 1.87;
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

// Event Listener for Purchase Button
document.getElementById("purchase-btn").addEventListener("click", () => {
  // Get the value of cash provided from the input
  const cashInput = document.getElementById("cash").value;
  const cash = parseFloat(cashInput); // Convert input to a number

  // Validate the input
  if (isNaN(cash) || cash <= 0) {
    alert("Please enter a valid cash amount.");
    return;
  }

  // Check if the cash provided is less than the price
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item.");
    return;
  }

  // Check if the cash provided is equal to the price
  if (cash === price) {
    document.getElementById("change-due").innerText = "No change due - customer paid with exact cash.";
    return;
  }

  // Call the function to calculate change if cash > price
  calculateChange(price, cash, cid);
});