const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

// Event listener for rolling the dice
rollDiceBtn.addEventListener("click", () => {
  // Generate five random numbers between 1 and 6
  diceValuesArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);

  // Display the numbers in the dice elements
  listOfAllDice.forEach((die, index) => {
    die.textContent = diceValuesArr[index]; // Update each die with the corresponding value
  });

  console.log("Dice values:", diceValuesArr); // Debug: Log dice values
});

const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

// Add a click event listener to the "Roll the Dice" button
rollDiceBtn.addEventListener("click", () => {
  // Check if the user has already made 3 rolls in this round
  if (rolls === 3) {
    // Alert the user that they cannot roll more than 3 times
    alert("You have made three rolls this round. Please select a score.");
  } else {
    // Increment the roll count, as the user is rolling again
    rolls++;

    // Call the rollDice function to generate new dice values and update the display
    rollDice();
    updateStats();

  }
});

// Event Listener to Toggle between showing and hiding the rules

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing; // Toggle state

  if (isModalShowing) {
    rulesContainer.style.display = "block"; // Show rules
    rulesBtn.textContent = "Hide rules"; // Update button text
  } else {
    rulesContainer.style.display = "none"; // Hide rules
    rulesBtn.textContent = "Show rules"; // Update button text
  }
});