'use strict';
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

difficultySelect.addEventListener('change', function () {
  setDifficulty(this.value);
  resetTimer();
  gameStarted = false;
  gameOver = false;
  createBoard();
  updateFlagCounter();
});