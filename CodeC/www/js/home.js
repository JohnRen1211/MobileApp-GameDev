function startGame() {
  const username = document.getElementById("username").value;
  if (username.trim() === "") {
    alert("Please enter a valid username.");
  } else {
    // Save the username in local storage before redirecting to the game page
    localStorage.setItem("username", username);
    const url = "game.html";
    window.location.href = url;
  }
}