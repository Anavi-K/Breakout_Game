function startGame() {
    // Get the values from the form
    const name = document.getElementById("name").value;
    const nickname = document.getElementById("nickname").value;

    // Store the values in local storage
    localStorage.setItem("name", name);
    localStorage.setItem("nickname", nickname);

    // Redirect to the game page
    window.location.href = "game.html";
}