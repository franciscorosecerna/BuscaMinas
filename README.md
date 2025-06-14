# 🧨 Buscaminas (Minesweeper)

Este proyecto es una implementacion del clasico juego **Buscaminas**, desarrollado con HTML, CSS y JavaScript puro.

---

## Caracteristicas

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

---

## Estructura del proyecto

```bash
├── index.html           # Estructura HTML
├── style.css            # Estilos visuales
├── js/
│   ├── config.js        # Configuración general del juego
│   ├── game.js          # Lógica principal
│   ├── handlers.js      # Manejadores de eventos
│   └── ui.js            # Lógica de interfaz
│   └── utils.js         # Funciones auxiliares
│   └── main.js          # Punto de entrada: inicialización y listeners
```
---
##  Nota

Este proyecto fue desarrollado con fines educativos y recreativos.
