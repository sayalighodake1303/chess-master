/**
 * REST API Client for Chess Master Backend
 */
const ChessAPI = {
    baseUrl: '/api',

    async createGame(data) {
        const response = await fetch(`${this.baseUrl}/games`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({ message: 'Failed to create game' }));
            throw new Error(err.message || 'Failed to create game');
        }
        return await response.json();
    },

    async getGame(gameId) {
        const response = await fetch(`${this.baseUrl}/games/${gameId}`);
        if (!response.ok) {
            const err = await response.json().catch(() => ({ message: 'Failed to fetch game' }));
            throw new Error(err.message || 'Failed to fetch game');
        }
        return await response.json();
    },

    async getLegalMoves(gameId, position) {
        const response = await fetch(`${this.baseUrl}/games/${gameId}/legal-moves/${position}`);
        if (!response.ok) {
            const err = await response.json().catch(() => ({ message: 'Failed to get legal moves' }));
            throw new Error(err.message || 'Failed to get legal moves');
        }
        return await response.json();
    },

    async makeMove(gameId, from, to, promotion = 'QUEEN') {
        const response = await fetch(`${this.baseUrl}/games/${gameId}/moves`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ from, to, promotion })
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({ message: 'Invalid move' }));
            throw new Error(err.message || 'Invalid move');
        }
        return await response.json();
    },

    async makeComputerMove(gameId) {
        const response = await fetch(`${this.baseUrl}/games/${gameId}/computer-move`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({ message: 'Failed to trigger computer move' }));
            throw new Error(err.message || 'Failed to trigger computer move');
        }
        return await response.json();
    },

    async undoMove(gameId) {
        const response = await fetch(`${this.baseUrl}/games/${gameId}/undo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({ message: 'Failed to undo move' }));
            throw new Error(err.message || 'Failed to undo move');
        }
        return await response.json();
    },

    async restartGame(gameId) {
        const response = await fetch(`${this.baseUrl}/games/${gameId}/restart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({ message: 'Failed to restart game' }));
            throw new Error(err.message || 'Failed to restart game');
        }
        return await response.json();
    },

    async getGameHistories() {
        const response = await fetch(`${this.baseUrl}/games`);
        if (!response.ok) {
            const err = await response.json().catch(() => ({ message: 'Failed to fetch histories' }));
            throw new Error(err.message || 'Failed to fetch histories');
        }
        return await response.json();
    }
};
