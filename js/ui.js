'use strict';
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
  var name = playerNameInput.value || "Jugador";
  var duration = seconds;
  saveGame(name, duration);
  resetTimer();
  soundVictory.play();
  resultMessage.textContent = '🎉 ¡Ganaste!';
  resultModal.style.display = 'flex';
  resetButton.textContent = '😎';
}

function resetGame() {
  soundVictory.pause();
  soundVictory.currentTime = 0;
  soundDefeat.pause();
  soundDefeat.currentTime = 0;
  gameStarted = false;
  gameOver = false;
  resetButton.textContent = '🙂';
  resetTimer();
  setDifficulty(difficultySelect.value);
  createBoard();
  updateFlagCounter();
}