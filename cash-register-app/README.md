# Cash Register App

## Overview
The Cash Register App simulates the functionality of a cash register. It calculates and manages change based on:
1. The price of an item.
2. The cash provided by the customer.
3. The available cash in the register.

The app dynamically updates the user interface (UI) to display transaction statuses and manage the cash drawer.

---

## Inputs
- **Price**: The cost of the item the customer wants to purchase.
- **Cash Provided**: The amount of money the customer gives to pay for the item.
- **Cash-in-Drawer (CID)**: A list of available denominations and their total amounts in the cash register.

---

## Outputs
### Status Messages
- `"No change due"`: When the cash provided equals the price.
- `"INSUFFICIENT_FUNDS"`: When the register cannot return the exact change due to insufficient total or missing denominations.
- `"OPEN"`: When change is successfully returned, leaving cash in the drawer.
- `"CLOSED"`: When the change returned depletes the entire cash drawer.

### Change Breakdown
- A detailed list of the denominations used to return change (e.g., `QUARTER: $0.5, DIME: $0.2`).

---

## How It Works
### Step 1: Validate Customer Input
- Checks if the customer has entered a valid cash amount.
- If the cash provided is less than the price:
  - Displays an alert: `"Customer does not have enough money to purchase the item."`
  - No further processing occurs.

### Step 2: Handle Exact Payments
- If the cash provided equals the price:
  - Displays: `"No change due - customer paid with exact cash."`
  - Ends the transaction.

### Step 3: Calculate Change
- When the cash provided is greater than the price:
  - Calculates the total change due: `changeDue = cash - price`.
  - Checks if the total cash in the drawer is sufficient:
    - If insufficient, displays: `"INSUFFICIENT_FUNDS"`.
    - If sufficient, proceeds to determine the denominations needed.

### Step 4: Distribute Change
- Iterates through the denominations in descending order (e.g., `$100, $20, $10, ...`):
  - Uses as much of the highest denomination as possible without exceeding the change due.
  - Updates the drawer and reduces the remaining change due.

### Step 5: Determine Final Status
- If the exact change is returned:
  - If the drawer is emptied, sets the status to `"CLOSED"`.
  - Otherwise, sets the status to `"OPEN"`.

### Step 6: Update the UI
- Updates:
  - The status and change breakdown in a user-friendly format.
  - The cash drawer to reflect the remaining denominations after the transaction.

### Step 7: Additional Features
- **Keyboard Shortcut**: Pressing "Enter" triggers the transaction.
- **Error Handling**: Alerts users for invalid or missing inputs.
- **Real-Time Updates**: Automatically refreshes the displayed cash drawer and price information.

---

## Example Scenarios
### Scenario 1: Exact Cash
- **Inputs**:
  - Price: `$3.26`
  - Cash Provided: `$3.26`
- **Output**:
  - Status: `"No change due - customer paid with exact cash."`

### Scenario 2: Sufficient Funds, Change Returned
- **Inputs**:
  - Price: `$3.26`
  - Cash Provided: `$10`
  - Cash-in-Drawer: Contains sufficient denominations.
- **Output**:
  - Status: `"OPEN"`
  - Change Breakdown: `"FIVE: $5, ONE: $1, QUARTER: $0.5, DIME: $0.2, PENNY: $0.04"`

### Scenario 3: Insufficient Funds
- **Inputs**:
  - Price: `$3.26`
  - Cash Provided: `$10`
  - Cash-in-Drawer: Missing denominations needed for exact change.
- **Output**:
  - Status: `"INSUFFICIENT_FUNDS"`

### Scenario 4: Drawer Closed
- **Inputs**:
  - Price: `$3.26`
  - Cash Provided: `$10`
  - Cash-in-Drawer: Matches exactly the amount of change due.
- **Output**:
  - Status: `"CLOSED"`
  - Change Breakdown: `"QUARTER: $0.5, DIME: $0.2, PENNY: $0.04"`

---

## Why It’s Useful
1. **Real-World Logic**: Simulates cash register operations found in retail businesses.
2. **Precision Calculations**: Handles edge cases like rounding and floating-point issues.
3. **Dynamic Updates**: Reflects changes to the cash drawer in real-time.

---

## Features Summary
- Handles scenarios for exact cash payments, insufficient funds, and correct change.
- Dynamically updates the UI to display:
  - Change breakdown by denomination.
  - Current cash in the drawer.
- Includes error handling for invalid inputs.
- Ensures precision in calculations using cent-based arithmetic.
