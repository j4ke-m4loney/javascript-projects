// Price of the item
let price = 19.5;

// Cash in Drawer
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

// Currency values for denominations
const currencyValues = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100,
};

// Event Listener for the Purchase Button
document.getElementById("purchase-btn").addEventListener("click", () => {
  const cashInput = document.getElementById("cash").value;
  const cash = parseFloat(cashInput);

  if (isNaN(cash) || cash <= 0) {
    alert("Please enter a valid cash amount.");
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item.");
    return;
  }

  if (cash === price) {
    document.getElementById("change-due").innerText = "No change due - customer paid with exact cash.";
    return;
  }

  calculateChange(price, cash, cid);
});

function calculateChange(price, cash, cid) {
  let changeDue = cash - price; // Calculate total change due
  let totalCashInDrawer = cid.reduce((total, [_, amount]) => total + amount, 0);
  totalCashInDrawer = Math.round(totalCashInDrawer * 100) / 100; // Avoid floating-point issues

  if (changeDue > totalCashInDrawer) {
    document.getElementById("change-due").innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let changeArray = [];
  for (let i = cid.length - 1; i >= 0; i--) {
    let [denomination, amountInDrawer] = cid[i];
    const denominationValue = currencyValues[denomination];
    let amountToReturn = 0;

    while (changeDue >= denominationValue && amountInDrawer > 0) {
      changeDue -= denominationValue;
      changeDue = Math.round(changeDue * 100) / 100;
      amountInDrawer -= denominationValue;
      amountToReturn += denominationValue;
    }

    if (amountToReturn > 0) {
      changeArray.push([denomination, amountToReturn]);
    }
  }

  if (changeDue > 0) {
    document.getElementById("change-due").innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  const changeTotal = changeArray.reduce((sum, [_, amount]) => sum + amount, 0);
  if (changeTotal === totalCashInDrawer) {
    const formattedChange = changeArray
      .map(([denomination, amount]) => `${denomination}: $${amount.toFixed(2)}`)
      .join(" ");
    document.getElementById("change-due").innerText = `Status: CLOSED ${formattedChange}`;
    return;
  }

  const formattedChange = changeArray
    .map(([denomination, amount]) => `${denomination}: $${amount.toFixed(2)}`)
    .join(" ");
  document.getElementById("change-due").innerText = `Status: OPEN ${formattedChange}`;
}