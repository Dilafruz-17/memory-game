import { createElement } from './dom.js';
import { createGame } from './game.js';
import { renderBoard, setCardState } from './board.js';
import { openModal, closeModal } from './modal.js';
import { saveResult } from './storage.js';
import { createLeaderboardContent } from './leaderboard.js';

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

    const element = createElement('header', { className: 'header' }, [
        createElement('h1', { className: 'title', text: 'Memory Game' }),
        createElement('div', { className: 'header__actions' }, [
            newGameButton,
            leaderboardButton,
        ]),
    ]);

    return { element, newGameButton, leaderboardButton };
}

function createStats() {
    const movesValue = createElement('span', { text: '0' });
    const pairsValue = createElement('span', { text: '0' });

    const element = createElement('div', { className: 'stats' }, [
        createElement('p', {}, ['Moves: ', movesValue]),
        createElement('p', {}, ['Pairs: ', pairsValue, ' / 8']),
    ]);

    return { element, movesValue, pairsValue };
}

function openLeaderboard() {
    openModal({
        title: 'Leaderboard',
        content: createLeaderboardContent(),
        actions: [{ text: 'Close', onClick: closeModal }],
    });
}

function initApp() {
    const header = createHeader();
    const stats = createStats();
    const board = createElement('div', { className: 'board' });
    const main = createElement('main', { className: 'main' }, [stats.element, board]);

    document.body.append(header.element, main);

    const game = createGame({
        onStart: (deck) => renderBoard(board, deck),
        onFlip: (uid) => setCardState(board, [uid], 'card--open', true),
        onClose: (uids) => setCardState(board, uids, 'card--open', false),
        onMatch: (uids) => {
            setCardState(board, uids, 'card--open', false);
            setCardState(board, uids, 'card--matched', true);
        },
        onStats: (moves, pairs) => {
            stats.movesValue.textContent = String(moves);
            stats.pairsValue.textContent = String(pairs);
        },
        onWin: (moves) => {
            saveResult(moves);
            openModal({
                title: 'You won!',
                content: createElement('p', { text: `Total moves: ${moves}` }),
                actions: [
                    {
                        text: 'New game',
                        onClick: () => {
                            closeModal();
                            game.start();
                        },
                    },
                    { text: 'Close', onClick: closeModal },
                ],
            });
        },
    });

    board.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        if (card) game.flip(card.dataset.uid);
    });

    header.newGameButton.addEventListener('click', game.start);
    header.leaderboardButton.addEventListener('click', openLeaderboard);

    game.start();
}

initApp();