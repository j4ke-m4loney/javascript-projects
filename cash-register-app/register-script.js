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
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");


const calculateChange = (price, cash, cid) => {

}

// Listens for purchase button

addEventListener.purchaseBtn('click', (cash, price, cid) => {

});


// New code to check -------------------------------------

function calculateChange(price, cash, cid) {
  const changeDue = cash - price;

  if (changeDue < 0) {
    alert("Customer does not have enough money to purchase the item.");
    return;
  }

  if (changeDue === 0) {
    document.getElementById("change-due").innerText = "No change due - customer paid with exact cash.";
    return;
  }

  let changeArray = [];
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

  let totalCashInDrawer = cid.reduce((total, [_, amount]) => total + amount, 0);
  totalCashInDrawer = Math.round(totalCashInDrawer * 100) / 100; // Avoid floating-point issues

  if (totalCashInDrawer < changeDue) {
    document.getElementById("change-due").innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  for (let i = cid.length - 1; i >= 0; i--) {
    const [denomination, amountInDrawer] = cid[i];
    const denominationValue = currencyValues[denomination];
    let amountToReturn = 0;

    while (changeDue >= denominationValue && amountInDrawer >= denominationValue) {
      changeDue -= denominationValue;
      changeDue = Math.round(changeDue * 100) / 100;
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

  const formattedChange = changeArray.map(([denomination, amount]) => `${denomination}: $${amount.toFixed(2)}`).join(" ");
  if (totalCashInDrawer === changeDue) {
    document.getElementById("change-due").innerText = `Status: CLOSED ${formattedChange}`;
  } else {
    document.getElementById("change-due").innerText = `Status: OPEN ${formattedChange}`;
  }
}