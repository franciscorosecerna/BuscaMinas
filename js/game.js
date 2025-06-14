'use strict';
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
          if (dx === 0 && dy === 0) continue; // evita la celda actual

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
