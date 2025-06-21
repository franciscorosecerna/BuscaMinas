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
  var x = '0';
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (flagged[i][j]) totalFlags++;
    }
  }
  if (totalFlags > 10 || mineCount - totalFlags < 0) x = ''
  flagCounter.textContent = '🚩 ' + x + (mineCount - totalFlags);
}

function getCell(row, col) {
  return boardElement.querySelector('[data-row="' + row + '"][data-col="' + col + '"]');
}

function calculateScore(revealCells, correctFlags, duration) {
  var penalizacionPorSegundo = 0.5;
  return Math.floor(
    (revealCells * 10) +
    (correctFlags * 20) -
    (duration * penalizacionPorSegundo)
  );
}

function countRevealCells() {
  var cells = document.querySelectorAll('.cell.revealed');
  return cells.length;
}

function countCorrectFlags() {
  var i, celda;
  var correct = 0;
  var cells = document.querySelectorAll('.cell.flagged');

  for (i = 0; i < cells.length; i++) {
    celda = cells[i];
    if (celda.classList.contains('mine')) {
      correct++;
    }
  }
  return correct;
}

function saveGame(name, duration) {
  var revealCells = countRevealCells();
  var correctFlags = countCorrectFlags();
  var score = calculateScore(revealCells, correctFlags, duration);
  
  var date = new Date().toISOString();
  var partida = {
    nombre: name,
    puntaje: score,
    fecha: date,
    duracion: duration
  };

  var ranking = JSON.parse(localStorage.getItem('ranking')) || [];
  ranking.push(partida);
  ranking.sort(function(a, b) {
    return b.puntaje - a.puntaje;
  });

  localStorage.setItem('ranking', JSON.stringify(ranking));
}

function showRanking(criterio) {
  var ranking = JSON.parse(localStorage.getItem('ranking')) || [];

  if (criterio === 'fecha') {
    ranking.sort(function(a, b) {
      return new Date(b.fecha) - new Date(a.fecha);
    });
  } else if (criterio === 'puntaje') {
    ranking.sort(function(a, b) {
      return b.puntaje - a.puntaje;
    });
  }

  var modalBody = document.getElementById('ranking-body');
  modalBody.innerHTML = '';

  for (var i = 0; i < ranking.length; i++) {
    var partida = ranking[i];

    var item = document.createElement('li');
    item.className = 'ranking-item';

    var nombre = document.createElement('span');
    nombre.className = 'ranking-name';
    nombre.textContent = partida.nombre;

    var puntaje = document.createElement('span');
    puntaje.className = 'ranking-score';
    puntaje.textContent = '🏆 ' + partida.puntaje + ' pts';

    var duracion = document.createElement('span');
    duracion.className = 'ranking-time';
    duracion.textContent = '⏱️ ' + partida.duracion + 's';

    var fecha = document.createElement('span');
    fecha.className = 'ranking-date';
    fecha.textContent = '📅 ' + partida.fecha.split('T')[0];

    item.appendChild(nombre);
    item.appendChild(puntaje);
    item.appendChild(duracion);
    item.appendChild(fecha);

    modalBody.appendChild(item);
  }

  document.getElementById('ranking-modal').classList.add('show');
}