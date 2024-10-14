
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