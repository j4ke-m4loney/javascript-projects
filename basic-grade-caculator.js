
// Provide a grade based on score

function getGrade(score) {
  if (score === 100) {
    return "A++";
  } else if (score >= 90 && score <= 99) {
    return "A";
  } else if (score >= 80 && score <= 89) {
    return "B";
  } else if (score >= 70 && score <= 79) {
    return "C";
  } else if (score >= 60 && score <= 69) {
    return "D";
  } else if (score >= 0 && score <= 59) {
    return "F";
  } else
    return "Bad Luck"
}

console.log(getGrade(96));
console.log(getGrade(82));
console.log(getGrade(56));

// Provide an answer of false for a pass based on Score

function hasPassingGrade(score) {
  let grade = getGrade(score);
  return grade !== "F"
}

console.log(hasPassingGrade(100));
console.log(hasPassingGrade(53));
console.log(hasPassingGrade(87));

// Message students the results

function studentMsg(totalScores, studentScore) {
  if (hasPassingGrade(studentScore) == true) {
    return ("Class average: " + getAverage(totalScores) + ". Your grade: " + getGrade(studentScore) + ". You passed the course.");
  } else {
    return ("Class average: " + getAverage(totalScores) + ". Your grade: " + getGrade(studentScore) + ". You failed the course.");
  }
}

console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));