'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn = document.getElementById('toggle-theme');
  var storedTheme = localStorage.getItem('theme');
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️ Modo claro';
  } else if (storedTheme === 'light') {
    document.body.classList.remove('dark');
    toggleBtn.textContent = '🌙 Modo oscuro';
  } else if (prefersDark) {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️ Modo claro';
  } else {
    document.body.classList.remove('dark');
    toggleBtn.textContent = '🌙 Modo oscuro';
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
        showError('name', 'El nombre debe ser alfanumérico.');
        valid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
        showError('mail', 'El correo electrónico no es válido.');
        valid = false;
      }

      if (message.length < 6) {
        showError('message', 'El mensaje debe tener al menos 6 caracteres.');
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
    var campos = ['name', 'mail', 'message'];
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

  if (!sessionStorage.getItem('ranking')) {
    sessionStorage.setItem('ranking', JSON.stringify([
      { nombre: 'Jugador1', puntaje: 120, fecha: '2025-06-21T00:00:00Z', duracion: 85 },
      { nombre: 'Jugador2', puntaje: 150, fecha: '2025-06-20T00:00:00Z', duracion: 75 }
    ]));
  }

});

difficultySelect.addEventListener('change', function () {
  setDifficulty(this.value);
  resetTimer();
  gameStarted = false;
  gameOver = false;
  createBoard();
  updateFlagCounter();
});

document.getElementById('ranking-button').addEventListener('click', function () {
  showRanking('puntaje');
});

document.getElementById('ranking-close').addEventListener('click', function () {
  document.getElementById('ranking-modal').classList.remove('show');
});

document.getElementById('date').addEventListener('click', function () {
  showRanking('fecha');
});

document.getElementById('score').addEventListener('click', function () {
  showRanking('puntaje');
});
