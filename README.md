# Memory Game

A card-matching game built with vanilla JavaScript. Flip two cards at a time and find all 8 pairs in as few moves as possible.

## Features

- 16 shuffled cards (8 pairs), moves and pairs counters
- Mismatched pair closes after 1 second, other cards are locked meanwhile
- Win modal with the total number of moves
- Leaderboard with the top 10 results stored in localStorage
- New game button works at any time
- All markup is generated with JavaScript

## Run locally

The project uses ES modules, so it must be served over HTTP (opening `index.html` via `file://` will not work).

1. Clone the repository and switch to the `memory-game` branch:
```bash
   git clone https://github.com/<your-username>/memory-game.git
   cd memory-game
   git checkout memory-game
```
2. Start a local server, for example:
```bash
   npx serve .
```
   or use the Live Server extension in VS Code.
3. Open the printed address (e.g. `http://localhost:3000`) in your browser.

## Project structure

- `js/main.js` — app setup and wiring
- `js/game.js` — game logic
- `js/board.js`, `js/card.js` — cards rendering and data
- `js/modal.js` — reusable modal
- `js/leaderboard.js`, `js/storage.js` — leaderboard and localStorage
- `js/dom.js`, `js/shuffle.js` — helpers