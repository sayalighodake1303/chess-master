/**
 * UI View Manager: Controls screens, modal windows, move history tables, and toast notifications.
 */
const UI = {
    currentView: 'viewHome',

    pieceSymbols: {
        'WHITE_PAWN': '♙', 'WHITE_KNIGHT': '♘', 'WHITE_BISHOP': '♗',
        'WHITE_ROOK': '♖', 'WHITE_QUEEN': '♕', 'WHITE_KING': '♔',
        'BLACK_PAWN': '♟', 'BLACK_KNIGHT': '♞', 'BLACK_BISHOP': '♝',
        'BLACK_ROOK': '♜', 'BLACK_QUEEN': '♛', 'BLACK_KING': '♚'
    },

    pieceValues: {
        'PAWN': 1, 'KNIGHT': 3, 'BISHOP': 3, 'ROOK': 5, 'QUEEN': 9, 'KING': 0
    },

    showView(viewId) {
        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        const target = document.getElementById(viewId);
        if (target) {
            target.classList.add('active');
            this.currentView = viewId;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },

    showHomeView() {
        this.showView('viewHome');
    },

    showFriendSetup() {
        this.showView('viewFriendSetup');
    },

    showComputerSetup() {
        this.showView('viewComputerSetup');
    },

    showGameView(game) {
        this.showView('viewGame');
        this.updateGameInfo(game);
    },

    updateGameInfo(game) {
        if (!game) return;

        // Player Labels
        const isUserWhite = game.userColor !== 'BLACK';
        const topPlayerName = isUserWhite ? game.playerBlackName : game.playerWhiteName;
        const bottomPlayerName = isUserWhite ? game.playerWhiteName : game.playerBlackName;
        const topPlayerColor = isUserWhite ? 'BLACK' : 'WHITE';
        const bottomPlayerColor = isUserWhite ? 'WHITE' : 'BLACK';

        document.getElementById('topPlayerName').textContent = topPlayerName;
        document.getElementById('topPlayerBadge').textContent = topPlayerColor;
        document.getElementById('topPlayerAvatar').textContent = topPlayerColor === 'WHITE' ? '♔' : '♚';

        document.getElementById('bottomPlayerName').textContent = bottomPlayerName;
        document.getElementById('bottomPlayerBadge').textContent = bottomPlayerColor;
        document.getElementById('bottomPlayerAvatar').textContent = bottomPlayerColor === 'WHITE' ? '♔' : '♚';

        // Active turn bar glow
        const topBar = document.getElementById('topPlayerBar');
        const bottomBar = document.getElementById('bottomPlayerBar');
        topBar.classList.toggle('active-turn', game.currentTurn === topPlayerColor);
        bottomBar.classList.toggle('active-turn', game.currentTurn === bottomPlayerColor);

        // Status Card Text
        const statusText = document.getElementById('statusText');
        const statusSub = document.getElementById('statusSub');

        if (game.gameStatus === 'IN_PROGRESS') {
            if (game.check) {
                statusText.textContent = '⚠️ CHECK!';
                statusText.style.color = '#ef4444';
                statusSub.textContent = `${game.currentTurn}'s King is under attack!`;
            } else {
                statusText.textContent = `${game.currentTurn}'s Turn`;
                statusText.style.color = '';
                statusSub.textContent = 'Make your move';
            }
        } else {
            statusText.textContent = 'GAME OVER';
            statusSub.textContent = game.winner ? `${game.winner} Won` : 'Draw';
        }

        // Clocks
        this.updateClocks(game.remainingWhiteSeconds, game.remainingBlackSeconds, game.userColor);

        // Move History Table
        this.renderMoveHistory(game.moveHistory);

        // Captured pieces & material balance
        this.renderCapturedPieces(game.capturedPieces);
    },

    updateClocks(whiteSec, blackSec, userColor) {
        const isUserWhite = userColor !== 'BLACK';
        const topSec = isUserWhite ? blackSec : whiteSec;
        const bottomSec = isUserWhite ? whiteSec : blackSec;

        const topClock = document.getElementById('topClock');
        const bottomClock = document.getElementById('bottomClock');

        topClock.textContent = this.formatTime(topSec);
        bottomClock.textContent = this.formatTime(bottomSec);

        topClock.classList.toggle('low-time', topSec <= 30 && topSec > 0);
        bottomClock.classList.toggle('low-time', bottomSec <= 30 && bottomSec > 0);
    },

    formatTime(totalSeconds) {
        if (totalSeconds == null || totalSeconds < 0) return '0:00';
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },

    renderMoveHistory(moves) {
        const tbody = document.getElementById('moveHistoryBody');
        const emptyMsg = document.getElementById('emptyHistoryMsg');
        const countBadge = document.getElementById('historyMoveCount');

        tbody.innerHTML = '';

        if (!moves || moves.length === 0) {
            emptyMsg.classList.remove('hidden');
            countBadge.textContent = '0 moves';
            return;
        }

        emptyMsg.classList.add('hidden');
        countBadge.textContent = `${moves.length} moves`;

        for (let i = 0; i < moves.length; i += 2) {
            const moveNum = Math.floor(i / 2) + 1;
            const whiteMove = moves[i] || '';
            const blackMove = moves[i + 1] || '';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="color: var(--text-muted);">${moveNum}.</td>
                <td><strong>${whiteMove}</strong></td>
                <td><strong>${blackMove}</strong></td>
            `;
            tbody.appendChild(tr);
        }

        // Scroll to bottom of history
        const container = document.querySelector('.history-table-container');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    },

    renderCapturedPieces(capturedList) {
        const topTray = document.getElementById('topCapturedTray');
        const bottomTray = document.getElementById('bottomCapturedTray');
        const scoreEl = document.getElementById('materialScore');

        topTray.innerHTML = '';
        bottomTray.innerHTML = '';

        let whiteMaterial = 0;
        let blackMaterial = 0;

        if (capturedList && Array.isArray(capturedList)) {
            capturedList.forEach(p => {
                const val = this.pieceValues[p.type] || 0;
                const sym = this.pieceSymbols[`${p.color}_${p.type}`] || '';

                const span = document.createElement('span');
                span.textContent = sym;

                if (p.color === 'BLACK') {
                    // White captured a black piece -> show in White's tray (bottom)
                    bottomTray.appendChild(span);
                    whiteMaterial += val;
                } else {
                    // Black captured a white piece -> show in Black's tray (top)
                    topTray.appendChild(span);
                    blackMaterial += val;
                }
            });
        }

        const diff = whiteMaterial - blackMaterial;
        if (diff > 0) {
            scoreEl.textContent = `White +${diff}`;
        } else if (diff < 0) {
            scoreEl.textContent = `Black +${Math.abs(diff)}`;
        } else {
            scoreEl.textContent = 'Equal (0)';
        }
    },

    setAIThinking(isThinking) {
        const badge = document.getElementById('aiThinkingBadge');
        if (badge) {
            badge.classList.toggle('hidden', !isThinking);
        }
    },

    showGameOverModal(game, customReason) {
        const modal = document.getElementById('modalGameOver');
        const trophy = document.getElementById('gameOverIcon');
        const headline = document.getElementById('gameOverHeadline');
        const winner = document.getElementById('gameOverWinner');
        const reason = document.getElementById('gameOverReason');

        if (game.gameStatus.includes('CHECKMATE')) {
            trophy.textContent = '🏆';
            headline.textContent = 'CHECKMATE!';
            winner.textContent = `${game.winner} WINS!`;
            reason.textContent = 'By decisive checkmate victory.';
        } else if (game.gameStatus.includes('TIME_OUT')) {
            trophy.textContent = '⏱️';
            headline.textContent = 'TIME OUT!';
            winner.textContent = `${game.winner} WINS!`;
            reason.textContent = customReason || 'Opponent ran out of time.';
        } else {
            trophy.textContent = '🤝';
            headline.textContent = 'DRAW!';
            winner.textContent = 'GAME TIED';
            reason.textContent = game.winner || 'By Stalemate or Insufficient Material.';
        }

        this.showModal('modalGameOver');
    },

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('hidden');
    },

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('hidden');
    },

    showToast(message, type = 'info') {
        const toast = document.getElementById('toastAlert');
        if (!toast) return;

        toast.textContent = message;
        toast.className = `toast-alert ${type}`;
        toast.classList.remove('hidden');

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
};
