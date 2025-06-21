'use strict';
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

function revealCell(row, col) {
  if (revealed[row][col] || flagged[row][col]) return;

  var cell = getCell(row, col);
  revealed[row][col] = true;
  cell.classList.add('revealed');

  if (board[row][col] === 'M') {
    cell.classList.add('mine');
    gameOver = true;
    var name = playerNameInput.value || "Jugador";
    var duration = seconds;
    saveGame(name, duration);
    resetTimer();
    revealAllMines();
    soundDefeat.play();
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