const boardElement = document.getElementById("board");
const resetButton = document.getElementById("reset-btn");
const timerElement = document.querySelector(".timer");
const flagCounterElement = document.querySelector(".flag-counter");
const playerNameInput = document.getElementById("player-name");
const resultModal = document.getElementById("result-modal");
const resultMessage = document.getElementById("result-message");
const modalRestartButton = document.getElementById("modal-restart");
const startButton = document.getElementById("start-game");
const nameWarningModal = document.getElementById("name-warning-modal");
const ROWS = 8;
const COLS = 8;
const MINES_COUNT = 10;

let flagsLeft = MINES_COUNT;
let timer = null;
let secondsElapsed = 0;
let gameStarted = false;
let board = [];
let minePositions = [];

startButton.addEventListener("click", () => {
  const playerName = playerNameInput.value.trim();

  if (playerName.length < 3) {
    nameWarningModal.style.display = "block";
    return;
  }

  createBoard();
  const modal = document.getElementById("startModal");
  modal.style.display = "none";
});

function createBoard() {
  secondsElapsed = 0;
  updateTimerDisplay();
  gameStarted = false;
  resetButton.textContent = "🙂";
  board = [];
  boardElement.innerHTML = "";
  minePositions = getRandomMinePositions();

  for (let row = 0; row < ROWS; row++) {
    const rowArray = [];
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;

      cell.addEventListener("click", handleLeftClick);
      cell.addEventListener("contextmenu", handleRightClick);

      boardElement.appendChild(cell);

      rowArray.push({
        element: cell,
        row,
        col,
        isMine: isMine(row, col),
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0
      });
    }
    board.push(rowArray);
  }

  flagsLeft = MINES_COUNT;
  updateFlagCounter();
  calculateAdjacentMines();
}

function updateFlagCounter() {
  flagCounterElement.textContent = `🚩 ${String(flagsLeft).padStart(3, "0")}`;
}

function getRandomMinePositions() {
  const positions = new Set();

  while (positions.size < MINES_COUNT) {
    const pos = Math.floor(Math.random() * ROWS * COLS);
    positions.add(pos);
  }

  return [...positions].map(pos => ({
    row: Math.floor(pos / COLS),
    col: pos % COLS
  }));
}

function isMine(row, col) {
  return minePositions.some(pos => pos.row === row && pos.col === col);
}

function calculateAdjacentMines() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = board[row][col];
      if (cell.isMine) continue;

      const neighbors = getNeighbors(row, col);
      cell.adjacentMines = neighbors.filter(n => n.isMine).length;
    }
  }
}

function getNeighbors(row, col) {
  const neighbors = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;

      const r = row + dr;
      const c = col + dc;

      if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
        neighbors.push(board[r][c]);
      }
    }
  }
  return neighbors;
}

function handleLeftClick(e) {
  if (!gameStarted) {
    startTimer();
    gameStarted = true;
  }

  const cellEl = e.currentTarget;
  const row = parseInt(cellEl.dataset.row);
  const col = parseInt(cellEl.dataset.col);
  const cell = board[row][col];

  if (cell.isRevealed || cell.isFlagged) return;

  revealCell(cell);

  if (cell.isMine) {
    cell.element.classList.add("mine");
    gameOver(false);
  } else if (cell.adjacentMines > 0) {
    cell.element.classList.add(`number-${cell.adjacentMines}`);
    cell.element.textContent = cell.adjacentMines;
  } else {
    revealEmptyCells(row, col);
  }

  checkWin();
}

function handleRightClick(e) {
  e.preventDefault();
  const cellEl = e.currentTarget;
  const row = parseInt(cellEl.dataset.row);
  const col = parseInt(cellEl.dataset.col);
  const cell = board[row][col];

  if (cell.isRevealed) return;

  if (!cell.isFlagged && flagsLeft > 0) {
    cell.isFlagged = true;
    cell.element.classList.add("flagged");
    flagsLeft--;
  } else if (cell.isFlagged) {
    cell.isFlagged = false;
    cell.element.classList.remove("flagged");
    flagsLeft++;
  }
  updateFlagCounter();
}

function revealCell(cell) {
  if (cell.isRevealed) return;
  cell.isRevealed = true;
  cell.element.classList.add("revealed");
}

function revealEmptyCells(row, col) {
  const queue = [board[row][col]];

  while (queue.length > 0) {
    const cell = queue.shift();
    revealCell(cell);

    if (cell.adjacentMines > 0) {
      cell.element.classList.add(`number-${cell.adjacentMines}`);
      cell.element.textContent = cell.adjacentMines;
      continue;
    }

    const neighbors = getNeighbors(cell.row, cell.col);
    for (const neighbor of neighbors) {
      if (!neighbor.isRevealed && !neighbor.isFlagged && !neighbor.isMine) {
        revealCell(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

function gameOver(won) {
  stopTimer();
  for (const row of board) {
    for (const cell of row) {
      if (cell.isMine && !cell.isRevealed) {
        cell.element.classList.add("revealed", "mine");
      }
    }
  }

  resetButton.textContent = won ? "😎" : "😵";

  for (const row of board) {
    for (const cell of row) {
      cell.element.removeEventListener("click", handleLeftClick);
      cell.element.removeEventListener("contextmenu", handleRightClick);
    }
  }

  setTimeout(() => {
    resultMessage.textContent = won ? "¡Ganaste! 🎉" : "¡Perdiste! 💥";
    resultModal.style.display = "block";
  }, 200);
}

function checkWin() {
  let revealedCount = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell.isRevealed) revealedCount++;
    }
  }

  if (revealedCount === ROWS * COLS - MINES_COUNT) {
    gameOver(true);
  }
}

function startTimer() {
  timer = setInterval(() => {
    secondsElapsed++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function updateTimerDisplay() {
  timerElement.textContent = `⏱ ${String(secondsElapsed).padStart(3, "0")}`;
}

resetButton.addEventListener("click", createBoard);


modalRestartButton.addEventListener("click", () => {
  resultModal.style.display = "none";
  createBoard();
});

document.getElementById("close-name-warning").addEventListener("click", () => {
  nameWarningModal.style.display = "none";
});