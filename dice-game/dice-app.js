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

const rollDice = () => {
  diceValuesArr = [];

  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  };

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};

const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScoreElement.textContent = score;

  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

const getHighestDuplicates = (diceValuesArr) => {
  const counts = {};
  diceValuesArr.forEach(num => {
    counts[num] = (counts[num] || 0) + 1;
  });

  const totalSum = diceValuesArr.reduce((sum, num) => sum + num, 0);
  if (Object.values(counts).some(count => count >= 4)) {
    updateRadioOption(1, totalSum);
  }
  if (Object.values(counts).some(count => count >= 3)) {
    updateRadioOption(0, totalSum);
  }
  updateRadioOption(5, 0)
};

const resetRadioOptions = () => {
  scoreInputs.forEach(input => {
    input.disabled = true;
    input.checked = false;
  });
  scoreSpans.forEach(span => {
    span.textContent = "";
  });
}


rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
  } else {
    resetRadioOptions();
    rolls++;
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
  }
});

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;

  if (isModalShowing) {
    rulesBtn.textContent = "Hide rules";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.textContent = "Show rules";
    rulesContainer.style.display = "none";
  }
});

keepScoreBtn.addEventListener("click", () => {

  for (let i = 0; i < scoreInputs.length; i++) {
    if (scoreInputs[i].checked) {
      // Step 2: Update the score and reset options
      updateScore(scoreInputs[i].value, scoreInputs[i].id);
      resetRadioOptions();
      return; // Exit the loop after handling the selection
    }
  }
  // Step 3: Alert the user if no option is selected
  alert("Please select an option");
});