const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;


// To clear all characters from inputs
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

// To remove invalid inputs regex 
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}
// result is null from test: console.log(isInvalidInput("10"));

// Accepting entries from dropdown
function addEntry() {
  const targetId = '#' + entryDropdown.value;
  const targetInputContainer = document.querySelector(targetId + ' .input-container');
}