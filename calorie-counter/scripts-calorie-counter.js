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
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

/*
  This function calculates the total calories consumed, burned, and remaining based on user inputs for meals and exercise. 
  It first prevents form submission, resets the error flag, collects calorie inputs, and checks for any invalid input. 
  If valid, it sums up the calories consumed and burned, compares them with the calorie budget, 
  and determines if there is a calorie surplus or deficit. Finally, it updates the HTML to display the results 
  and makes the output visible.
*/
function calculateCalories(e) {
  e.preventDefault(); // Stops the form from submitting and refreshing the page.
  isError = false; // Resets the error flag to false before processing.

  // Grabs all number input elements from different meal sections and exercise
  const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");
  const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
  const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
  const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
  const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");

  // Calls getCaloriesFromInputs() to calculate total calories from each section
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]); // Gets the calorie budget

  // If there's an error in inputs, exit the function
  if (isError) {
    return;
  }
  // Calculates total consumed calories and remaining calories based on budget and exercise
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;

  // Checks if the result is a surplus or deficit
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';

  // Updates the output area with the result, including formatted values
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;
  // Removes the 'hide' class to make the output visible
  output.classList.remove('hide');
}

// Calculates Calories and also checks for invalid inputs by creating an alert

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

addEntryButton.addEventListener("click", addEntry);