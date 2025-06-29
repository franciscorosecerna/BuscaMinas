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

document.getElementById('board').addEventListener('mousedown', function (e) {
  if (e.buttons === 3) {
    var target = e.target;
    if (!target.classList.contains('cell') || !target.classList.contains('revealed')) return;

    var row = parseInt(target.getAttribute('data-row'), 10);
    var col = parseInt(target.getAttribute('data-col'), 10);
    var cellValue = board[row][col];

    if (isNaN(cellValue) || cellValue <= 0) return;

    var flagCount = 0;
    var hiddenCells = [];

    for (var dx = -1; dx <= 1; dx++) {
      for (var dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        var newRow = row + dx;
        var newCol = col + dy;

        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
          if (flagged[newRow][newCol]) {
            flagCount++;
          } else if (!revealed[newRow][newCol]) {
            hiddenCells.push({ row: newRow, col: newCol });
          }
        }
      }
    }

    if (flagCount === cellValue) {
        for (var i = 0; i < hiddenCells.length; i++) {
          var pos = hiddenCells[i];
          var el = getCell(pos.row, pos.col);
          el.classList.add('flash');
        }

        setTimeout(function () {
          for (var i = 0; i < hiddenCells.length; i++) {
            var pos = hiddenCells[i];
            var el = getCell(pos.row, pos.col);
            el.classList.remove('flash');
            revealCell(pos.row, pos.col);
          }
        }, 600);
      }
    }
});