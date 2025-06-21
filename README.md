# 🧨 Buscaminas (Minesweeper)

Este proyecto es una implementacion del clasico juego **Buscaminas**, desarrollado con HTML, CSS y JavaScript (ES5).

---

## ✨Caracteristicas

- **Tres niveles de dificultad** seleccionables:
    - Facil (8x8 - 10 minas)
    - Medio (12x12 - 20 minas)
    - Dificil (16x16 - 40 minas)
- **Temporizador** que inicia con el primer clic
- **Contador de banderas** restantes
- **Boton con carita** para reiniciar el juego:
    - 🙂 Inicial
    - 😵 Al perder
    - 😎 Al ganar
- **Revelado automatico** de casillas vacias (efecto cascada)
- **Deteccion de victoria y derrota**
- **Cálculo de puntaje** basado en:
  - Casillas reveladas
  - Banderas correctas
  - Tiempo invertido

## 📈Ranking de partidas
- **Guarda:**
  - Nombre del jugador
  - Puntaje
  - Fecha
  - Duración
- **Ordenable** por:
  - Puntaje (predeterminado)
  - Fecha

## 🎨 Temas

- 🌞 para el **Modo claro** y 🌙 para el **Modo oscuro**
- Se guarda la preferencia del jugador

## 📣 Formulario de contacto

- **Validaciones con JavaScript:**
  - Nombre alfanumérico
  - Correo válido
  - Mensaje mayor a 5 caracteres
- Abre cliente de correo **predeterminado** (`mailto`)

## 🔊 Sonido

- Efectos de **victoria** y **derrota**
- **Se reinician automáticamente** al reiniciar la partida
  
---

## 📁 Estructura del proyecto

```bash
├── index.html
├── style.css
├── sounds/
│   ├── victory.mp3
│   └── defeat.mp3
├── js/
│   ├── config.js
│   ├── game.js
│   ├── handlers.js
│   ├── ui.js
│   ├── utils.js
│   └── main.js
```
---

##  Nota

Este proyecto fue desarrollado con fines **educativos y recreativos**.
