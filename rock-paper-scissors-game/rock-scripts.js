
// This function generates a random choice for the computer
function getRandomComputerResult() {
  const options = ["Rock", "Paper", "Scissors"]; // Array of possible choices for the computer
  const randomIndex = Math.floor(Math.random() * options.length);  // Get a random index

  /* 
  - Math.random() generates a random number between 0 (inclusive) and 1 (exclusive)
  - Multiplying by options.length ensures the random number ranges between 0 and the length of the options array
  - Math.floor() rounds the result down to the nearest whole number, giving a valid array index (0, 1, or 2)
  - randomIndex now holds a random index between 0 and the length of the options array minus 1
  - return options[randomIndex]; Returns a random choice from the array 
  */

}
console.log(getRandomComputerResult());

let playerScore = 0;
let computerScore = 0;

function hasPlayerWonTheRound(player, computer) {

  // Check if the player has chosen "Rock" and the computer has chosen "Scissors"
  // This is a winning combination for the player
  return (
    (player === "Rock" && computer === "Scissors") ||

    // Check if the player has chosen "Scissors" and the computer has chosen "Paper"
    // This is another winning combination for the player
    (player === "Scissors" && computer === "Paper") ||

    // Check if the player has chosen "Paper" and the computer has chosen "Rock"
    // This is the third winning combination for the player
    (player === "Paper" && computer === "Rock")
  );
}

function getRoundResults(userOption) {
  // Get the computer's choice using the getRandomComputerResult function
  const computerResult = getRandomComputerResult();

  // Check if the player has won the round
  if (hasPlayerWonTheRound(userOption, computerResult) === true) {
    playerScore += 1;  // Increment the player's score
    return `Player wins! ${userOption} beats ${computerResult}`;  // Return a message for player victory
  }
  // Check if the round is a tie
  else if (userOption === computerResult) {
    return `It's a tie! Both chose ${userOption}`;  // Return a message for a tie
  }
  // If the computer won the round
  else {
    computerScore += 1;  // Increment the computer's score
    return `Computer wins! ${computerResult} beats ${userOption}`;  // Return a message for computer victory
  }
}

console.log(getRoundResults("Rock"));  // Test the function with the player's choice as "Rock"
console.log("Player Score: ", playerScore, "Computer Score: ", computerScore);  // Output the scores


// Now it is time to update the scores and the round results message.

const playerScoreSpanElement = document.getElementById("player-score");  // Get the player score element from the DOM
const computerScoreSpanElement = document.getElementById("computer-score");  // Get the computer score element from the DOM
const roundResultsMsg = document.getElementById("results-msg");  // Get the element that will display the round result message

function showResults(userOption) {
  const roundResult = getRoundResults(userOption);  // Call getRoundResults to determine the winner of the round

  // Update the player and computer scores in the DOM
  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;

  // Update the DOM with the round result message
  roundResultsMsg.innerText = roundResult;
};

showResults("Rock");  // Call the showResults function, simulating the player choosing "Rock"