import { createElement } from './dom.js';
import { loadResults } from './storage.js';

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${date.getFullYear()}`;
}

export function createLeaderboardContent() {
    const results = loadResults();

    if (results.length === 0) {
        return createElement('p', { text: 'No results yet' });
    }

    const head = createElement('thead', {}, [
        createElement('tr', {}, [
            createElement('th', { text: 'Place' }),
            createElement('th', { text: 'Moves' }),
            createElement('th', { text: 'Date' }),
        ]),
    ]);

    const rows = results.map((result, index) =>
        createElement('tr', {}, [
            createElement('td', { text: String(index + 1) }),
            createElement('td', { text: String(result.moves) }),
            createElement('td', { text: formatDate(result.timestamp) }),
        ]),
    );

    return createElement('table', { className: 'leaderboard' }, [
        head,
        createElement('tbody', {}, rows),
    ]);
}