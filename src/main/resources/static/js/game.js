/**
 * Game Manager: Orchestrates turn flow, API interactions, chess clocks, pawn promotion, and AI moves.
 */
class GameManager {
    constructor() {
        this.currentGame = null;
        this.boardUI = new ChessBoardUI('chessboard');
        this.timerInterval = null;
        this.isComputerThinking = false;
        this.pendingPromotionMove = null;

        this.initEventListeners();
    }

    initEventListeners() {
        this.boardUI.setSquareClickCallback((notation) => this.handleSquareClicked(notation));

        // Promotion modal choices
        document.querySelectorAll('.promo-choice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const choice = btn.dataset.piece;
                this.completePromotionMove(choice);
            });
        });

        // Game action controls
        document.getElementById('btnUndoMove').addEventListener('click', () => this.undoMove());
        document.getElementById('btnRestartGame').addEventListener('click', () => this.restartGame());
        document.getElementById('btnMainMenu').addEventListener('click', () => UI.showHomeView());

        // Game over modal buttons
        document.getElementById('btnGameOverPlayAgain').addEventListener('click', () => {
            UI.hideModal('modalGameOver');
            this.restartGame();
        });
        document.getElementById('btnGameOverMainMenu').addEventListener('click', () => {
            UI.hideModal('modalGameOver');
            UI.showHomeView();
        });
    }

    async startNewGame(setupData) {
        try {
            this.stopTimer();
            UI.showToast('Initializing game...', 'info');

            const game = await ChessAPI.createGame(setupData);
            this.currentGame = game;

            UI.showGameView(this.currentGame);
            this.boardUI.render(this.currentGame);
            this.startTimer();

            // If vs Computer and Computer is White, trigger AI move first
            if (this.currentGame.gameMode === 'COMPUTER' &&
                this.currentGame.userColor === 'BLACK' &&
                this.currentGame.currentTurn === 'WHITE') {
                this.triggerComputerMove();
            }
        } catch (err) {
            UI.showToast(err.message, 'error');
            ChessSound.playError();
        }
    }

    async handleSquareClicked(notation) {
        if (!this.currentGame || this.isComputerThinking || this.currentGame.gameStatus !== 'IN_PROGRESS') {
            return;
        }

        const selectedFrom = this.boardUI.selectedSquare;

        // If a piece is already selected and user clicks one of the green highlighted legal squares:
        if (selectedFrom && this.boardUI.legalMoves.includes(notation)) {
            const movingPiece = this.getPieceAt(selectedFrom);

            // Check if this move is a Pawn Promotion
            const isWhitePawnPromo = movingPiece && movingPiece.type === 'PAWN' && movingPiece.color === 'WHITE' && notation.endsWith('8');
            const isBlackPawnPromo = movingPiece && movingPiece.type === 'PAWN' && movingPiece.color === 'BLACK' && notation.endsWith('1');

            if (isWhitePawnPromo || isBlackPawnPromo) {
                this.pendingPromotionMove = { from: selectedFrom, to: notation };
                UI.showModal('modalPromotion');
                return;
            }

            await this.executeMove(selectedFrom, notation, 'QUEEN');
            return;
        }

        // If user clicked on one of their own pieces:
        const pieceAtSquare = this.getPieceAt(notation);
        if (pieceAtSquare && pieceAtSquare.color === this.currentGame.currentTurn) {
            // If in vs Computer mode, verify player is moving their own color
            if (this.currentGame.gameMode === 'COMPUTER' && pieceAtSquare.color !== this.currentGame.userColor) {
                UI.showToast("It's not your turn!", 'warning');
                return;
            }

            if (selectedFrom === notation) {
                // Deselect on second click
                this.boardUI.clearHighlights();
            } else {
                // Fetch legal moves from Java Backend
                try {
                    const legalMovesResp = await ChessAPI.getLegalMoves(this.currentGame.id, notation);
                    this.boardUI.showLegalMoves(notation, legalMovesResp.legalMoves);
                } catch (err) {
                    console.error('Error fetching legal moves:', err);
                }
            }
            return;
        }

        // Clicking anywhere else clears selection
        this.boardUI.clearHighlights();
    }

    async completePromotionMove(promotionPiece) {
        UI.hideModal('modalPromotion');
        if (this.pendingPromotionMove) {
            const { from, to } = this.pendingPromotionMove;
            this.pendingPromotionMove = null;
            await this.executeMove(from, to, promotionPiece);
        }
    }

    async executeMove(from, to, promotion = 'QUEEN') {
        try {
            this.boardUI.clearHighlights();
            const moveResponse = await ChessAPI.makeMove(this.currentGame.id, from, to, promotion);

            this.currentGame = moveResponse.gameState;
            this.boardUI.render(this.currentGame);
            UI.updateGameInfo(this.currentGame);

            // Play sound effect
            if (moveResponse.checkmate) {
                ChessSound.playCheckmate();
            } else if (moveResponse.check) {
                ChessSound.playCheck();
            } else if (moveResponse.capturedPiece) {
                ChessSound.playCapture();
            } else {
                ChessSound.playMove();
            }

            // Check for Game Over
            if (this.currentGame.gameStatus !== 'IN_PROGRESS') {
                this.stopTimer();
                setTimeout(() => UI.showGameOverModal(this.currentGame), 600);
                return;
            }

            // Check if AI should move
            if (this.currentGame.gameMode === 'COMPUTER' &&
                this.currentGame.currentTurn !== this.currentGame.userColor) {
                this.triggerComputerMove();
            }

        } catch (err) {
            UI.showToast(err.message, 'error');
            ChessSound.playError();
        }
    }

    async triggerComputerMove() {
        this.isComputerThinking = true;
        UI.setAIThinking(true);

        // Small authentic thinking delay
        setTimeout(async () => {
            try {
                const moveResponse = await ChessAPI.makeComputerMove(this.currentGame.id);
                this.currentGame = moveResponse.gameState;
                this.boardUI.render(this.currentGame);
                UI.updateGameInfo(this.currentGame);

                if (moveResponse.checkmate) {
                    ChessSound.playCheckmate();
                } else if (moveResponse.check) {
                    ChessSound.playCheck();
                } else if (moveResponse.capturedPiece) {
                    ChessSound.playCapture();
                } else {
                    ChessSound.playMove();
                }

                if (this.currentGame.gameStatus !== 'IN_PROGRESS') {
                    this.stopTimer();
                    setTimeout(() => UI.showGameOverModal(this.currentGame), 600);
                }
            } catch (err) {
                UI.showToast(err.message, 'error');
            } finally {
                this.isComputerThinking = false;
                UI.setAIThinking(false);
            }
        }, 500);
    }

    async undoMove() {
        if (!this.currentGame || this.isComputerThinking) return;
        try {
            const updatedGame = await ChessAPI.undoMove(this.currentGame.id);
            this.currentGame = updatedGame;
            this.boardUI.render(this.currentGame);
            UI.updateGameInfo(this.currentGame);
            UI.showToast('Move undone', 'info');
            ChessSound.playMove();
        } catch (err) {
            UI.showToast(err.message, 'error');
        }
    }

    async restartGame() {
        if (!this.currentGame || this.isComputerThinking) return;
        try {
            const updatedGame = await ChessAPI.restartGame(this.currentGame.id);
            this.currentGame = updatedGame;
            this.boardUI.render(this.currentGame);
            UI.updateGameInfo(this.currentGame);
            this.startTimer();
            UI.showToast('Game restarted', 'info');

            if (this.currentGame.gameMode === 'COMPUTER' &&
                this.currentGame.userColor === 'BLACK' &&
                this.currentGame.currentTurn === 'WHITE') {
                this.triggerComputerMove();
            }
        } catch (err) {
            UI.showToast(err.message, 'error');
        }
    }

    startTimer() {
        this.stopTimer();
        this.timerInterval = setInterval(() => {
            if (!this.currentGame || this.currentGame.gameStatus !== 'IN_PROGRESS') {
                return;
            }

            if (this.currentGame.currentTurn === 'WHITE') {
                this.currentGame.remainingWhiteSeconds = Math.max(0, this.currentGame.remainingWhiteSeconds - 1);
                if (this.currentGame.remainingWhiteSeconds === 0) {
                    this.handleTimeOut('WHITE');
                }
            } else {
                this.currentGame.remainingBlackSeconds = Math.max(0, this.currentGame.remainingBlackSeconds - 1);
                if (this.currentGame.remainingBlackSeconds === 0) {
                    this.handleTimeOut('BLACK');
                }
            }

            UI.updateClocks(this.currentGame.remainingWhiteSeconds, this.currentGame.remainingBlackSeconds, this.currentGame.userColor);
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    handleTimeOut(flaggedColor) {
        this.stopTimer();
        const winner = flaggedColor === 'WHITE' ? this.currentGame.playerBlackName : this.currentGame.playerWhiteName;
        this.currentGame.gameStatus = flaggedColor === 'WHITE' ? 'TIME_OUT_BLACK_WON' : 'TIME_OUT_WHITE_WON';
        this.currentGame.winner = winner;
        UI.showGameOverModal(this.currentGame, `Time Out! ${flaggedColor} ran out of time.`);
    }

    getPieceAt(notation) {
        if (!this.currentGame || !this.currentGame.pieces) return null;
        return this.currentGame.pieces.find(p => p.position === notation);
    }
}
