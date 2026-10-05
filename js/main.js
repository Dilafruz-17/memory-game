import { createElement } from './dom.js';
import { createDeck } from './card.js';
import { renderBoard } from './board.js';

function createHeader() {
    const newGameButton = createElement('button', {
        className: 'btn',
        text: 'New game',
        attrs: { type: 'button' },
    });

    const leaderboardButton = createElement('button', {
        className: 'btn',
        text: 'Leaderboard',
        attrs: { type: 'button' },
    });

    return createElement('header', { className: 'header' }, [
        createElement('h1', { className: 'title', text: 'Memory Game' }),
        createElement('div', { className: 'header__actions' }, [
            newGameButton,
            leaderboardButton,
        ]),
    ]);
}

function createStats() {
    return createElement('div', { className: 'stats' }, [
        createElement('p', { text: 'Moves: 0' }),
        createElement('p', { text: 'Pairs: 0 / 8' }),
    ]);
}

function createBoard() {
    return createElement('div', { className: 'board' });
}

function initApp() {
    const board = createBoard();
    const main = createElement('main', { className: 'main' }, [
        createStats(),
        board,
    ]);
    document.body.append(createHeader(), main);

    renderBoard(board, createDeck());
}

initApp();