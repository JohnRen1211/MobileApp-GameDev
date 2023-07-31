// highscores.js
const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const clearHighScoresBtn = document.getElementById("clearHighScoresBtn");

// Display the highscores
highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");

// Clear highscores function
clearHighScores = () => {
  localStorage.removeItem("highScores");
  highScoresList.innerHTML = ""; // Clear the displayed highscores on the page
};

clearHighScoresBtn.addEventListener("click", clearHighScores);
