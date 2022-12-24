// JavaScript code
const player1NameInput = document.querySelector('#player1Name');
const player2NameInput = document.querySelector('#player2Name');
const gridSizeSelect = document.querySelector('#gridSizeSelect');
const resetButton = document.querySelector('#resetButton');
const canvas = document.querySelector('#ticTacToeCanvas');
const ctx = canvas.getContext('2d');

let gridSize = 3;
let board = [];
let currentPlayer = 'X';
let gameOver = false;

// Initialize the board with empty values
initBoard();

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
  const row = Math.floor(y / (canvas.height / gridSize));
  const col = Math.floor(x / (canvas.width / gridSize));

  // Place a piece if the cell is empty and the game is not over
  if (board[row][col] === '') {
    board[row][col] = currentPlayer;
    drawBoard();
    checkGameOver();
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  }
});

// Handle clicks on the reset button
resetButton.addEventListener('click', () => {
  initBoard();
  drawBoard();
  gameOver = false;
});

// Handle changes in the grid size dropdown
gridSizeSelect.addEventListener('change', () => {
  gridSize = parseInt(gridSizeSelect.value);
  initBoard();
  canvas.width = gridSize * 100;
  canvas.height = gridSize * 100;
  drawBoard();
  gameOver = false;
});

// Initialize the board with empty values
function initBoard() {
  board = [];
  for (let i = 0; i < gridSize; i++) {
    board.push(new Array(gridSize).fill(''));
  }
  currentPlayer = 'X';
}

// Draw the board and pieces on the canvas
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw rows and columns
  for (let i = 1; i < gridSize; i++) {
    ctx.beginPath();
    ctx.moveTo(i * (canvas.width / gridSize), 0);
    ctx.lineTo(i * (canvas.width / gridSize), canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * (canvas.height / gridSize));
    ctx.lineTo(canvas.width, i * (canvas.height / gridSize));
    ctx.stroke();
  }

  // Draw pieces
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (board[i][j] === 'X') {
        ctx.beginPath();
        ctx.moveTo(j * (canvas.width / gridSize) + 20, i * (canvas.height / gridSize) + 20);
        ctx.lineTo((j + 1) * (canvas.width / gridSize) - 20, (i + 1) * (canvas.height / gridSize) - 20);
        ctx.moveTo((j + 1) * (canvas.width / gridSize) - 20, i * (canvas.height / gridSize) + 20);
        ctx.lineTo(j * (canvas.width / gridSize) + 20, (i + 1) * (canvas.height / gridSize) - 20);
        ctx.stroke();
      } else if (board[i][j] === 'O') {
        ctx.beginPath();
        ctx.arc(j * (canvas.width / gridSize) + (canvas.width / gridSize) / 2, i * (canvas.height / gridSize) + (canvas.height / gridSize) / 2, (canvas.width / gridSize) / 2 - 20, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }
}

   // Check if the game is over and show the result
function checkGameOver() {
  let winner = null;

  // Check rows
  for (let i = 0; i < gridSize; i++) {
    if (board[i].every(cell => cell === 'X')) {
      winner = 'X';
      break;
    } else if (board[i].every(cell => cell === 'O')) {
      winner = 'O';
      break;
    }
  }

  // Check columns
  if (!winner) {
    for (let i = 0; i < gridSize; i++) {
      let column = [];
      for (let j = 0; j < gridSize; j++) {
        column.push(board[j][i]);
      }
      if (column.every(cell => cell === 'X')) {
        winner = 'X';
        break;
      } else if (column.every(cell => cell === 'O')) {
        winner = 'O';
        break;
      }
    }
  }

  // Check diagonals
  if (!winner) {
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < gridSize; i++) {
      diagonal1.push(board[i][i]);
      diagonal2.push(board[i][gridSize - i - 1]);
    }
    if (diagonal1.every(cell => cell === 'X') || diagonal2.every(cell => cell === 'X')) {
      winner = 'X';
    } else if (diagonal1.every(cell => cell === 'O') || diagonal2.every(cell => cell === 'O')) {
      winner = 'O';
    }
  }

  // Check if it's a draw
  if (!winner && board.flat().every(cell => cell !== '')) {
    winner = 'draw';
  }

  // Show the result
  if (winner) {
    gameOver = true;
    if (winner === 'X') {
      alert(`${player1NameInput.value} wins!`);
    } else if (winner === 'O') {
      alert(`${player2NameInput.value} wins!`);
    } else {
      alert("It's a draw!");
    }
  }
}


