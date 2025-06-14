'use strict';
var boardElement = document.getElementById('board');
var resetButton = document.getElementById('reset-btn');
var startGameButton = document.getElementById('start-game');
var modalRestart = document.getElementById('modal-restart');
var difficultySelect = document.getElementById('difficulty');
var resultModal = document.getElementById('result-modal');
var resultMessage = document.getElementById('result-message');
var nameWarningModal = document.getElementById('name-warning-modal');
var closeNameWarning = document.getElementById('close-name-warning');
var playerNameInput = document.getElementById('player-name');
var nameError = document.getElementById('nameError');
var flagCounter = document.querySelector('.flag-counter');
var timerElement = document.querySelector('.timer');
var board = [];
var revealed = [];
var flagged = [];
var size = 8;
var mineCount = 10;
var gameStarted = false;
var gameOver = false;
var timer;
var seconds = 0;

function setDifficulty(value) {
  if (value === 'easy') {
    size = 8;
    mineCount = 10;
  } else if (value === 'medium') {
    size = 12;
    mineCount = 25;
  } else if (value === 'hard') {
    size = 16;
    mineCount = 40;
  }
}

difficultySelect.addEventListener('change', onDifficultyChange);

function onDifficultyChange() {
  setDifficulty(this.value);
  resetTimer();
  gameStarted = false;
  gameOver = false;
  createBoard();
  updateFlagCounter();
}

function startTimer() {
  timer = setInterval(function () {
    seconds++;
    timerElement.textContent = '⏱ ' + (seconds < 10 ? '00' : seconds < 100 ? '0' : '') + seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  timerElement.textContent = '⏱ 000';
}

function createBoard() {
  boardElement.innerHTML = '';
  board = [];
  revealed = [];
  flagged = [];

  for (var i = 0; i < size; i++) {
    var row = [];
    var revealedRow = [];
    var flaggedRow = [];

    var rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    boardElement.appendChild(rowDiv);

    for (var j = 0; j < size; j++) {
      row.push(0);
      revealedRow.push(false);
      flaggedRow.push(false);

      var cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);

      cell.addEventListener('click', handleCellClick);
      cell.addEventListener('contextmenu', handleRightClick);

      rowDiv.appendChild(cell);
    }

    board.push(row);
    revealed.push(revealedRow);
    flagged.push(flaggedRow);
  }
}

function handleCellClick(e) {
  if (gameOver) return;

  var row = parseInt(this.getAttribute('data-row'));
  var col = parseInt(this.getAttribute('data-col'));

  if (!gameStarted) {
    placeMines(row, col);
    calculateNumbers();
    gameStarted = true;
    startTimer();
  }

  revealCell(row, col);
}

function handleRightClick(e) {
  e.preventDefault();
  if (gameOver || !gameStarted) return;

  var row = parseInt(this.getAttribute('data-row'));
  var col = parseInt(this.getAttribute('data-col'));

  if (revealed[row][col]) return;

  flagged[row][col] = !flagged[row][col];
  this.classList.toggle('flagged');

  updateFlagCounter();
}

function updateFlagCounter() {
  var totalFlags = 0;
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (flagged[i][j]) totalFlags++;
    }
  }
  flagCounter.textContent = '🚩 ' + (mineCount - totalFlags < 10 ? '0' : '') + (mineCount - totalFlags);
}

function revealCell(row, col) {
  if (revealed[row][col] || flagged[row][col]) return;

  var cell = getCell(row, col);
  revealed[row][col] = true;
  cell.classList.add('revealed');

  if (board[row][col] === 'M') {
    cell.classList.add('mine');
    gameOver = true;
    resetTimer();
    revealAllMines();
    resultMessage.textContent = '💥 ¡Perdiste!';
    resultModal.style.display = 'flex';
    resetButton.textContent = '😵';
    return;
  }

  if (board[row][col] > 0) {
    cell.classList.add('number-' + board[row][col]);
    cell.textContent = board[row][col];
  } else {
    for (var dx = -1; dx <= 1; dx++) {
      for (var dy = -1; dy <= 1; dy++) {
        var newRow = row + dx;
        var newCol = col + dy;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          revealCell(newRow, newCol);
        }
      }
    }
  }

  checkWin();
}

function getCell(row, col) {
  return boardElement.querySelector('[data-row="' + row + '"][data-col="' + col + '"]');
}

function revealAllMines() {
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (board[i][j] === 'M') {
        var cell = getCell(i, j);
        cell.classList.add('revealed', 'mine');
      }
    }
  }
}

function checkWin() {
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (board[i][j] !== 'M' && !revealed[i][j]) return;
    }
  }
  gameOver = true;
  resetTimer();
  resultMessage.textContent = '🎉 ¡Ganaste!';
  resultModal.style.display = 'flex';
  resetButton.textContent = '😎';
}

function placeMines(initialRow, initialCol) {
  var minesPlaced = 0;
  while (minesPlaced < mineCount) {
    var row = Math.floor(Math.random() * size);
    var col = Math.floor(Math.random() * size);

    if (board[row][col] !== 'M' && (row !== initialRow || col !== initialCol)) {
      board[row][col] = 'M';
      minesPlaced++;
    }
  }
}

function calculateNumbers() {
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (board[i][j] === 'M') continue;

      var count = 0;
      for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
          var newRow = i + dx;
          var newCol = j + dy;
          if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
            if (board[newRow][newCol] === 'M') count++;
          }
        }
      }
      board[i][j] = count;
    }
  }
}

function resetGame() {
  gameStarted = false;
  gameOver = false;
  resetButton.textContent = '🙂';
  resetTimer();
  setDifficulty(difficultySelect.value);
  createBoard();
  updateFlagCounter();
}

resetButton.addEventListener('click', resetGame);
modalRestart.addEventListener('click', function () {
  resultModal.style.display = 'none';
  resetGame();
});

closeNameWarning.addEventListener('click', function () {
  nameWarningModal.style.display = 'none';
});

startGameButton.addEventListener('click', function () {
  var name = playerNameInput.value.trim();
  if (name.length < 3) {
    nameError.textContent = 'El nombre debe tener al menos 3 caracteres.';
    return;
  }
  document.getElementById('startModal').classList.remove('show');
  resetGame();
});