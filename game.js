document.addEventListener("DOMContentLoaded", function () {
    // Retrieve name and nickname from local storage
    const name = localStorage.getItem("name");
    const nickname = localStorage.getItem("nickname");
  
    // Display name and nickname in the name-box
    const nameBox = document.querySelector(".name-box");
    nameBox.textContent = `Name: ${name} | Nickname: ${nickname}`;
  
    // Add your Breakout game code here...
  
    // Example: Initialize canvas and other game variables
    const canvas = document.querySelector(".game");
    const ctx = canvas.getContext("2d");
    // ... (your existing game code)
  });
  