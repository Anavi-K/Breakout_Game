document.addEventListener("DOMContentLoaded", function () {
    // Retrieve name and nickname from local storage
    const name = localStorage.getItem("name");
    const nickname = localStorage.getItem("nickname");
  
    // Display name and nickname in the name-display
    const nameDisplay = document.querySelector(".name-display");
    nameBox.textContent = `Name: ${name} | Nickname: ${nickname}`;
  
  });