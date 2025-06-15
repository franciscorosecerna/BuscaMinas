'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn = document.getElementById('toggle-theme');
  var storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️ Modo claro';
  }

  toggleBtn.addEventListener('click', function () {
    var isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggleBtn.textContent = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
  });

  var contactForm = document.getElementById('contact-form');
  var showFormBtn = document.getElementById('show-form');
  var formContainer = document.getElementById('form-container');

  if (showFormBtn) {
    showFormBtn.addEventListener('click', function () {
      formContainer.classList.toggle('hide');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var mail = document.getElementById('mail').value.trim();
      var message = document.getElementById('message').value.trim();

      clearErrors();

      var valid = true;

      if (!/^[a-zA-Z0-9\s]+$/.test(name) || name === '') {
        showError('nombre', 'El nombre debe ser alfanumérico.');
        valid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
        showError('email', 'El correo electrónico no es válido.');
        valid = false;
      }

      if (message.length < 6) {
        showError('mensaje', 'El mensaje debe tener al menos 6 caracteres.');
        valid = false;
      }

      if (valid) {
        var subject = encodeURIComponent('Contacto de ' + name);
        var body = encodeURIComponent(
          'Nombre: ' + name + '\nCorreo: ' + mail + '\n\nMensaje:\n' + message
        );
        window.location.href = 'mailto:tuemail@ejemplo.com?subject=' + subject + '&body=' + body;
      }
    });
  }

  function showError(campo, mensaje) {
    var error = document.getElementById('error-' + campo);
    if (error) {
      error.textContent = mensaje;
    }
  }

  function clearErrors() {
    var campos = ['nombre', 'email', 'mensaje'];
    for (var i = 0; i < campos.length; i++) {
      var err = document.getElementById('error-' + campos[i]);
      if (err) err.textContent = '';
    }
  }
});

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
