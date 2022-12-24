// JavaScript code
const player1NameInput = document.querySelector('#player1Name');
const player2NameInput = document.querySelector('#player2Name');
const resetButton = document.querySelector('#resetButton');
const canvas = document.querySelector('#ticTacToeCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 3;
let board = [];
let currentPlayer = 'X';
let gameOver = false;

// Initialize the board with empty values
for (let i = 0; i < gridSize; i++) {
  board.push(new Array(gridSize).fill(''));
}

// Set the canvas size and draw the initial board
canvas.width = gridSize * 100;
canvas.height = gridSize * 100;
drawBoard();

// Handle clicks on the canvas
canvas.addEventListener('click', (event) => {
  if (gameOver) return;

  // Calculate the row and column of the clicked cell
  const x = event.offsetX;
  const y = event.offsetY;
  const row = Math.floor(y / 100);
  const col = Math.floor(x / 100);

  // Place a piece if the cell is empty and the game is not over
  if (board[row][col] === '') {
    board[row][col] = currentPlayer;
    drawBoard();
    checkGameOver();
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  }
});

// Draw the board and pieces on the canvas
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grid lines
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  for (let i = 1; i < gridSize; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 100, 0);
    ctx.lineTo(i * 100, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * 100);
    ctx.lineTo(canvas.width, i * 100);
    ctx.stroke();
  }

  // Draw pieces
  ctx.font = '60px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (board[i][j] === 'X') {
        ctx.fillText('X', (j + 0.5) * 100, (i + 0.5) * 100);
      } else if (board[i][j] === 'O') {
        ctx.fillText('O', (j + 0.5) * 100, (i + 0.5) * 100);
      }
    }
  }
}
// Check if the game is over
function checkGameOver() {
  let winner = null;

  // Check rows
  for (let i = 0; i < gridSize; i++) {
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      winner = board[i][0];
      break;
    }
  }

  // Check columns
  if (!winner) {
    for (let i = 0; i < gridSize; i++) {
      if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        winner = board[0][i];
        break;
      }
    }
  }

  // Check diagonals
  if (!winner) {
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      winner = board[0][0];
    } else if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      winner = board[0][2];
    }
  }

  // Check for draw
  let draw = true;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (board[i][j] === '') {
        draw = false;
        break;
      }
    }
  }

  if (winner) {
    gameOver = true;
	if(`${winner}` =='X')
		alert(`${player1NameInput.value} wins!`);
	else
		alert(`${player2NameInput.value} wins!`);
  } else if (draw) {
    gameOver = true;
    alert('Draw!');
  }
}
// Initialize the board with empty values
function initBoard() {
  board = [];
  for (let i = 0; i < gridSize; i++) {
    board.push(new Array(gridSize).fill(''));
  }
  currentPlayer = 'X';
}

// Handle clicks on the reset button
resetButton.addEventListener('click', () => {
  initBoard();
  drawBoard();
  gameOver = false;
});


