'use strict';
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

function updateFlagCounter() {
  var totalFlags = 0;
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (flagged[i][j]) totalFlags++;
    }
  }
  flagCounter.textContent = '🚩 ' + (mineCount - totalFlags < 10 ? '0' : '') + (mineCount - totalFlags);
}

function getCell(row, col) {
  return boardElement.querySelector('[data-row="' + row + '"][data-col="' + col + '"]');
}