// Set up canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Set up grid properties
const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

// Set up snake properties
let snake = [{ x: 7, y: 7 }];
let dx = 1;
let dy = 0;

// Set up food properties
let food = { x: Math.floor(Math.random() * gridWidth), y: Math.floor(Math.random() * gridHeight) };

// Set up game speed
const gameSpeed = 200; // in milliseconds

// Draw grid
function drawGrid() {
  ctx.fillStyle = '#ddd';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      ctx.strokeStyle = '#aaa';
      ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
}

// Draw snake
function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
}

// Draw food
function drawFood() {
  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Check for game over
function gameOver() {
  if (
    snake[0].x < 0 ||
    snake[0].x > gridWidth ||
    snake[0].y < 0 ||
    snake[0].y > gridHeight
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Update game state
function update() {
  // Update snake position
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    // Generate new food
    food = { x: Math.floor(Math.random() * gridWidth), y: Math.floor(Math.random() * gridHeight) };
  } else {
    // Remove last segment of snake
    snake.pop();
  }

  // Check for game over
  if (gameOver()) {
    alert('GAME OVER');
    window.location.reload();
  }
}

// Set up event listeners for arrow keys
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    dx = -1;
    dy = 0;
  } else if (e.key === 'ArrowUp') {
    dx = 0;
    dy = -1;
  } else if (e.key === 'ArrowRight') {
    dx = 1;
    dy = 0;
  } else if (e.key === 'ArrowDown') {
    dx = 0;
    dy = 1;
  }
});

// Set up game loop
function loop() {
  drawGrid();
  drawSnake();
  drawFood();
  update();
  setTimeout(loop, gameSpeed);
}

loop();

