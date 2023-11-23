document.addEventListener("DOMContentLoaded", function () {
  
  // Retrieve the stored score, name, and nickname from localStorage
  var finalScore = localStorage.getItem("finalScore");
  var playerName = localStorage.getItem("name");
  var playerNickname = localStorage.getItem("nickname");

  // Display the score in the score div
  var scoreDiv = document.querySelector(".score");

  // Style the text
  scoreDiv.style.color = "#FFFFFF";
  scoreDiv.style.fontSize = "40px";
  scoreDiv.style.textAlign = "center";

  scoreDiv.textContent = "Score: " + finalScore;

  // Display the name and nickname in the name-display div
  var nameDisplayDiv = document.querySelector(".name-display");

  // Combine the name and nickname strings
  var nameAndNickname = "";
  if (playerName) {
    nameAndNickname += "Name: " + playerName;
    if (playerNickname) {
      nameAndNickname += " | Nickname: " + playerNickname;
    }
  } else if (playerNickname) {
    nameAndNickname += "Nickname: " + playerNickname;
  }

  // Set the inner HTML of the name-display div
  nameDisplayDiv.innerHTML = nameAndNickname;

  // Style for text in the name-display div
  nameDisplayDiv.style.color = "#FFFFFF";
  nameDisplayDiv.style.fontSize = "24px";
  nameDisplayDiv.style.textAlign = "center";
});
