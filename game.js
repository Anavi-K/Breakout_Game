document.addEventListener("DOMContentLoaded", function () {
  // Retrieve name and nickname from local storage
  const name = localStorage.getItem("name");
  const nickname = localStorage.getItem("nickname");

  // Display name and nickname in the name-box
  const nameBox = document.querySelector(".name-box");
  nameBox.textContent = `Name: ${name} | Nickname: ${nickname}`;

  //style for text in name-box
  nameBox.style.color = "#FFFFFF";
  nameBox.style.fontSize = "24px";
  nameBox.style.textAlign = "center";

  var hitPaddleSound = document.getElementById("hitPaddleSound");
  var hitBrickSound = document.getElementById("hitBrickSound");
  var loseLifeSound = document.getElementById("loseLifeSound");

  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var ballRadius = 7;
  var x = canvas.width / 2;
  var y = canvas.height - 30;
  var dx = 3;
  var dy = -3;
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width - paddleWidth) / 2;
  var rightPressed = false;
  var leftPressed = false;
  var gameStarted = false;

  var brickRowCount = 5;
  var brickColumnCount = 12;
  var brickWidth = 75;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetTop = 30;
  var brickOffsetLeft = 30;

  var bricks = [];
  for (var c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: "standing" };
      }
  }

  var lives = 3;
  var score = 0;

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("keydown", startGameHandler, false);

  function keyDownHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = true;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = true;
      }
  }

  function keyUpHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = false;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = false;
      }
  }

  function startGameHandler(e) {
      if (e.code === "Space" && !gameStarted) {
          gameStarted = true;
          draw();
      }
  }

  function resetBricks() {
      for (var c = 0; c < brickColumnCount; c++) {
          for (var r = 0; r < brickRowCount; r++) {
              bricks[c][r].status = "standing";
          }
      }

      x = canvas.width / 2;
      y = canvas.height - 30;
      dx = 2.5;
      dy = -2.5;
  }

  function gameOver() {
      localStorage.setItem("finalScore", score);
      window.location.href = "game-over.html";
  }

  function collisionDetection() {
      if (x > paddleX && x < paddleX + paddleWidth && y + dy > canvas.height - ballRadius - paddleHeight) {
          dy = -dy;
          hitPaddleSound.play(); // Play hit paddle sound
      }

      for (var c = 0; c < brickColumnCount; c++) {
          for (var r = 0; r < brickRowCount; r++) {
              var b = bricks[c][r];
              if (b.status == "standing") {
                  if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                      dy = -dy;
                      b.status = "broken";
                      score++;
                      hitBrickSound.play(); // Play hit brick sound
                      if (score == brickRowCount * brickColumnCount) {
                          resetBricks();
                      }
                  }
              }
          }
      }
  }

  function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.closePath();
  }

  function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.closePath();
  }

  function drawBricks() {
      for (var c = 0; c < brickColumnCount; c++) {
          for (var r = 0; r < brickRowCount; r++) {
              if (bricks[c][r].status == "standing") {
                  var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                  var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                  bricks[c][r].x = brickX;
                  bricks[c][r].y = brickY;
                  ctx.beginPath();
                  ctx.rect(brickX, brickY, brickWidth, brickHeight);
                  ctx.fillStyle = "#FFFFFF";
                  ctx.fill();
                  ctx.closePath();
              }
          }
      }
  }

  function draw() {
      if (!gameStarted) {
          ctx.font = "25px Arial";
          ctx.fillStyle = "#FFFFFF";
          var text = "Press Space Bar to Start";
          var textWidth = ctx.measureText(text).width;
          ctx.fillText(text, (canvas.width - textWidth) / 2, canvas.height / 2);
          return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      collisionDetection();

      ctx.font = "18px Arial";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("Lives: " + lives + "/3", 10, 20);
      ctx.fillText("Score: " + score, canvas.width - 80, 20);

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
          dx = -dx;
      }
      if (y + dy < ballRadius) {
          dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
          if (x > paddleX && x < paddleX + paddleWidth) {
              dy = -dy;
          } else {
              lives--;
              loseLifeSound.play(); // Play lose life sound
              if (lives == 0) {
                  gameOver();
                  return;
              } else {
                  x = canvas.width / 2;
                  y = canvas.height - 30;
                  paddleX = (canvas.width - paddleWidth) / 2;
              }
          }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
          paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
          paddleX -= 7;
      }

      x += dx;
      y += dy;
      requestAnimationFrame(draw);
  }
});