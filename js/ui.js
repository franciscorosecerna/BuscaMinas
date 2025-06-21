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
  resetTimer();
  soundVictory.play();
  resultMessage.textContent = '🎉 ¡Ganaste!';
  resultModal.style.display = 'flex';
  resetButton.textContent = '😎';

  var nombre = playerNameInput.value || "Jugador";
  var reveladas = countRevealCells();
  var correctas = countCorrectFlags();
  var duracion = seconds;
  var puntaje = calculateScore(reveladas, correctas, duracion);
  saveGame(nombre, puntaje, duracion);
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