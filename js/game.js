import { createDeck } from './card.js';

const MISMATCH_DELAY = 1000;
const TOTAL_PAIRS = 8;

export function createGame({ onStart, onFlip, onClose, onMatch, onStats, onWin }) {
    let deck = [];
    let opened = [];
    let moves = 0;
    let pairs = 0;
    let timerId = null;
    let locked = false;
    const matchedUids = new Set();

    function start() {
        clearTimeout(timerId);
        timerId = null;
        deck = createDeck();
        opened = [];
        matchedUids.clear();
        moves = 0;
        pairs = 0;
        locked = false;
        onStart(deck);
        onStats(moves, pairs);
    }

    function flip(uid) {
        if (locked) return;
        if (matchedUids.has(uid)) return;
        if (opened.some((card) => card.uid === uid)) return;

        const card = deck.find((item) => item.uid === uid);
        if (!card) return;

        opened.push(card);
        onFlip(uid);
        if (opened.length < 2) return;

        moves += 1;
        const [first, second] = opened;

        if (first.id === second.id) {
            matchedUids.add(first.uid);
            matchedUids.add(second.uid);
            pairs += 1;
            opened = [];
            onMatch([first.uid, second.uid]);
            onStats(moves, pairs);
            if (pairs === TOTAL_PAIRS && onWin) onWin(moves);
            return;
        }

        locked = true;
        onStats(moves, pairs);
        timerId = setTimeout(() => {
            onClose([first.uid, second.uid]);
            opened = [];
            locked = false;
            timerId = null;
        }, MISMATCH_DELAY);
    }

    return { start, flip };
}