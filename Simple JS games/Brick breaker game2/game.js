// Get the canvas element
const canvas = document.getElementById('canvas');
// Get the 2D rendering context
const ctx = canvas.getContext('2d');

// Set the ball's properties
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballDX = 2;
let ballDY = -2;

// Set the paddle's properties
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

// Set the brick's properties
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

  // Set the level properties
  let level = 1;
  let brickCount = brickRowCount * brickColumnCount;
  let speed = 2;

  // Create a 2D array of bricks
  let bricks = [];
  for (let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for (let r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  // Set the score and lives
  let score = 0;
  let lives = 3;

  // Handle keydown events
  function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
      rightPressed = true;
    }
    else if (e.key == 'Left' || e.key == 'ArrowLeft') {
      leftPressed = true;
    }
  }

    // Handle keyup events
  function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
      rightPressed = false;
    }
    else if (e.key == 'Left' || e.key == 'ArrowLeft') {
      leftPressed = false;
    }
  }

  // Attach event listeners to the document
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);

  // Draw the ball on the canvas
  function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }

  // Draw the paddle on the canvas
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }
  // Draw the bricks on the canvas
  function drawBricks() {
    for (let c=0; c<brickColumnCount; c++) {
      for (let r=0; r<brickRowCount; r++) {
        if (bricks[c][r].status == 1) {
          let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
          let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = 'blue';
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  // Draw the score on the canvas
  function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: '+score, 8, 20);
  }

  // Draw the lives on the canvas
  function drawLives() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Lives: '+lives, canvas.width-65, 20);
  }

    // Detect collision between ball and bricks
  function collisionDetection() {
    for (let c=0; c<brickColumnCount; c++) {
      for (let r=0; r<brickRowCount; r++) {
        let b = bricks[c][r];
        if (b.status == 1) {
          if (ballX > b.x && ballX < b.x+brickWidth && ballY > b.y && ballY < b.y+brickHeight) {
            ballDY = -ballDY;
            b.status = 0;
            score++;
            brickCount--;
            if (brickCount == 0) {
              level++;
              brickRowCount++;
              brickColumnCount++;
              brickCount = brickRowCount * brickColumnCount;
              speed++;
              reset();
            }
          }
        }
      }
    }
  }

  // Reset the game state when starting a new level
  function reset() {
    ballX = canvas.width / 2;
    ballY = canvas.height - 30;
    ballDX = speed;
    ballDY = -speed;
    paddleX = (canvas.width - paddleWidth) / 2;
	bricks = [];
	  for (let c=0; c<brickColumnCount; c++) {
		bricks[c] = [];
		for (let r=0; r<brickRowCount; r++) {
		  bricks[c][r] = { x: 0, y: 0, status: 1 };
		}
	  }
  }

  // Move the ball
  function moveBall() {
    ballX += ballDX;
    ballY += ballDY;

    // Check for ball collision with walls
    if (ballX + ballDX > canvas.width-ballRadius || ballX + ballDX < ballRadius) {
      ballDX = -ballDX;
    }
    if (ballY + ballDY < ballRadius) {
      ballDY = -ballDY;
    }
    else if (ballY + ballDY > canvas.height-ballRadius-paddleHeight) {
      if (ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballDY = -ballDY;
      }
      else {
        lives--;
        if (!lives) {
          alert('Game over');
          document.location.reload();
        }
        else {
          ballX = canvas.width / 2;
          ballY = canvas.height - 30;
          ballDX = speed;
          ballDY = -speed;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }
  }

  // Move the paddle
  function movePaddle() {
    if (rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }
  }

  // Main game loop
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    moveBall();
    movePaddle();

    // Redraw the canvas at a fixed interval
    requestAnimationFrame(draw);
  }

  // Start the game
  draw();




