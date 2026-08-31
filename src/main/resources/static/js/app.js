/**
 * Application Bootstrap and Event Wiring
 */
let gameManager;

document.addEventListener('DOMContentLoaded', () => {
    gameManager = new GameManager();

    // -------------------------------------------------------------
    // Header & Home Navigation
    // -------------------------------------------------------------
    document.getElementById('btnNavLogo').addEventListener('click', () => UI.showHomeView());
    document.getElementById('btnNavHome').addEventListener('click', () => UI.showHomeView());
    document.getElementById('btnNavHowToPlay').addEventListener('click', () => UI.showModal('modalHowToPlay'));
    document.getElementById('btnNavHistory').addEventListener('click', () => openGameHistoryModal());
    document.getElementById('btnNavSettings').addEventListener('click', () => UI.showModal('modalSettings'));

    // -------------------------------------------------------------
    // Home Page Mode Cards & Buttons
    // -------------------------------------------------------------
    document.getElementById('btnCardFriend').addEventListener('click', () => UI.showFriendSetup());
    document.getElementById('btnCardComputer').addEventListener('click', () => UI.showComputerSetup());
    document.getElementById('btnHomeHowToPlay').addEventListener('click', () => UI.showModal('modalHowToPlay'));
    document.getElementById('btnHomeHistory').addEventListener('click', () => openGameHistoryModal());
    document.getElementById('btnHomeSettings').addEventListener('click', () => UI.showModal('modalSettings'));

    // -------------------------------------------------------------
    // Play With Friend Setup Screen
    // -------------------------------------------------------------
    document.getElementById('btnBackFromFriend').addEventListener('click', () => UI.showHomeView());

    // Friend White selector
    setupToggleGroup('friendWhiteSelector');
    // Friend Time control selector
    setupToggleGroup('friendTimeControl');

    document.getElementById('btnStartFriendGame').addEventListener('click', () => {
        const p1Name = document.getElementById('inputFriendP1').value.trim() || 'Player 1';
        const p2Name = document.getElementById('inputFriendP2').value.trim() || 'Player 2';
        const whiteSelection = document.querySelector('#friendWhiteSelector .active').dataset.value;
        const timeBtn = document.querySelector('#friendTimeControl .active');
        const timeMinutes = parseInt(timeBtn ? timeBtn.dataset.minutes : '10', 10);

        const playerWhite = (whiteSelection === 'P1') ? p1Name : p2Name;
        const playerBlack = (whiteSelection === 'P1') ? p2Name : p1Name;

        gameManager.startNewGame({
            playerWhiteName: playerWhite,
            playerBlackName: playerBlack,
            gameMode: 'FRIEND',
            timeControlMinutes: timeMinutes
        });
    });

    // -------------------------------------------------------------
    // Play With Computer Setup Screen
    // -------------------------------------------------------------
    document.getElementById('btnBackFromComputer').addEventListener('click', () => UI.showHomeView());

    setupToggleGroup('computerColorSelector');
    setupToggleGroup('computerTimeControl');

    // Difficulty cards selection
    const diffCards = document.querySelectorAll('#computerDifficultySelector .diff-card');
    diffCards.forEach(card => {
        card.addEventListener('click', () => {
            diffCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    document.getElementById('btnStartComputerGame').addEventListener('click', () => {
        const playerName = document.getElementById('inputComputerPlayerName').value.trim() || 'Player';
        const colorBtn = document.querySelector('#computerColorSelector .active');
        const userColor = colorBtn ? colorBtn.dataset.value : 'WHITE';
        const activeDiffCard = document.querySelector('#computerDifficultySelector .diff-card.active');
        const difficulty = activeDiffCard ? activeDiffCard.dataset.value : 'MEDIUM';
        const timeBtn = document.querySelector('#computerTimeControl .active');
        const timeMinutes = parseInt(timeBtn ? timeBtn.dataset.minutes : '10', 10);

        gameManager.startNewGame({
            playerWhiteName: userColor === 'WHITE' ? playerName : `Computer (${difficulty})`,
            playerBlackName: userColor === 'BLACK' ? playerName : `Computer (${difficulty})`,
            gameMode: 'COMPUTER',
            difficulty: difficulty,
            userColor: userColor,
            timeControlMinutes: timeMinutes
        });
    });

    // -------------------------------------------------------------
    // Modals Close Handlers
    // -------------------------------------------------------------
    document.getElementById('btnCloseHowToPlay').addEventListener('click', () => UI.hideModal('modalHowToPlay'));
    document.getElementById('btnHelpGotIt').addEventListener('click', () => UI.hideModal('modalHowToPlay'));

    document.getElementById('btnCloseHistory').addEventListener('click', () => UI.hideModal('modalHistory'));
    document.getElementById('btnCloseSettings').addEventListener('click', () => UI.hideModal('modalSettings'));

    // -------------------------------------------------------------
    // Settings Handling
    // -------------------------------------------------------------
    const themeSelect = document.getElementById('selectBoardTheme');
    themeSelect.addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });

    document.getElementById('checkSoundEnabled').addEventListener('change', (e) => {
        ChessSound.enabled = e.target.checked;
    });

    document.getElementById('btnSaveSettings').addEventListener('click', () => {
        UI.hideModal('modalSettings');
        UI.showToast('Settings saved', 'info');
    });

    // Load saved theme if any
    const savedTheme = localStorage.getItem('chess_theme') || 'theme-classic';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
});

function setupToggleGroup(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const options = container.querySelectorAll('.toggle-option');
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
        });
    });
}

function applyTheme(themeClass) {
    document.body.className = '';
    document.body.classList.add(themeClass);
    localStorage.setItem('chess_theme', themeClass);
}

async function openGameHistoryModal() {
    UI.showModal('modalHistory');
    const tbody = document.getElementById('historyTableBody');
    const emptyMsg = document.getElementById('noGamesRecordedMsg');
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">Loading histories...</td></tr>';

    try {
        const histories = await ChessAPI.getGameHistories();
        tbody.innerHTML = '';

        if (!histories || histories.length === 0) {
            emptyMsg.classList.remove('hidden');
            return;
        }

        emptyMsg.classList.add('hidden');
        histories.forEach(h => {
            const tr = document.createElement('tr');
            const dateStr = h.startTime ? new Date(h.startTime).toLocaleDateString() : '-';
            const winnerStr = h.winner || 'In Progress';

            tr.innerHTML = `
                <td>#${h.id}</td>
                <td><strong>${h.playerWhiteName}</strong></td>
                <td><strong>${h.playerBlackName}</strong></td>
                <td><span class="player-badge">${h.gameMode}</span></td>
                <td style="color: var(--accent-gold);">${winnerStr}</td>
                <td>${h.moveCount}</td>
                <td style="color: var(--text-muted);">${dateStr}</td>
                <td><button class="btn btn-outline" style="padding: 4px 10px; font-size: 0.75rem;" onclick="loadHistoricalGame(${h.id})">Inspect</button></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="8" style="color:var(--accent-red); text-align:center;">${err.message}</td></tr>`;
    }
}

window.loadHistoricalGame = async function(gameId) {
    try {
        UI.hideModal('modalHistory');
        const game = await ChessAPI.getGame(gameId);
        gameManager.currentGame = game;
        gameManager.stopTimer();
        UI.showGameView(game);
        gameManager.boardUI.render(game);
        UI.showToast(`Loaded Game #${gameId}`, 'info');
    } catch (err) {
        UI.showToast(err.message, 'error');
    }
};
