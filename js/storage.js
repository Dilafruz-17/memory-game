const STORAGE_KEY = 'memory-game-results';
const MAX_RESULTS = 10;

function compareResults(a, b) {
    return a.moves - b.moves || a.timestamp - b.timestamp;
}

export function loadResults() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function saveResult(moves) {
    const results = [...loadResults(), { moves, timestamp: Date.now() }]
        .sort(compareResults)
        .slice(0, MAX_RESULTS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}