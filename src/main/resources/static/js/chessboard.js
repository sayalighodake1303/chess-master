/**
 * Chessboard Component: Manages 64-square grid, piece rendering, and Green Legal Move Highlighting.
 */
class ChessBoardUI {
    constructor(boardElementId) {
        this.boardElement = document.getElementById(boardElementId);
        this.selectedSquare = null;
        this.legalMoves = []; // Array of notation strings e.g. ["e3", "e4"]
        this.onSquareClickCallback = null;
        this.onPieceSelectCallback = null;
        this.boardFlipped = false; // true if Black perspective

        // Unicode Piece Mapping
        this.pieceSymbols = {
            'WHITE_KING': '♔',
            'WHITE_QUEEN': '♕',
            'WHITE_ROOK': '♖',
            'WHITE_BISHOP': '♗',
            'WHITE_KNIGHT': '♘',
            'WHITE_PAWN': '♙',
            'BLACK_KING': '♚',
            'BLACK_QUEEN': '♛',
            'BLACK_ROOK': '♜',
            'BLACK_BISHOP': '♝',
            'BLACK_KNIGHT': '♞',
            'BLACK_PAWN': '♟'
        };

        this.initGrid();
    }

    initGrid() {
        this.boardElement.innerHTML = '';
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const square = document.createElement('div');
                square.className = `square ${(r + c) % 2 === 0 ? 'light' : 'dark'}`;
                const file = String.fromCharCode('a'.charCodeAt(0) + c);
                const rank = 8 - r;
                const notation = `${file}${rank}`;
                square.dataset.notation = notation;
                square.dataset.row = r;
                square.dataset.col = c;

                square.addEventListener('click', (e) => this.handleSquareClick(notation, e));
                this.boardElement.appendChild(square);
            }
        }
    }

    render(gameState) {
        this.clearHighlights();

        // Clear all piece elements from squares
        const squares = this.boardElement.querySelectorAll('.square');
        squares.forEach(sq => {
            sq.innerHTML = '';
            sq.classList.remove('selected-square', 'last-move', 'king-check');
        });

        if (!gameState) return;

        // Place pieces
        if (gameState.pieces && Array.isArray(gameState.pieces)) {
            gameState.pieces.forEach(p => {
                const square = this.getSquareElement(p.position);
                if (square) {
                    const pieceEl = document.createElement('div');
                    const colorClass = p.color === 'WHITE' ? 'white-piece' : 'black-piece';
                    pieceEl.className = `chess-piece ${colorClass}`;
                    const symbolKey = `${p.color}_${p.type}`;
                    pieceEl.textContent = this.pieceSymbols[symbolKey] || '?';
                    pieceEl.dataset.pieceType = p.type;
                    pieceEl.dataset.color = p.color;
                    square.appendChild(pieceEl);
                }
            });
        }

        // Highlight last move
        if (gameState.lastMoveFrom) {
            const fromSq = this.getSquareElement(gameState.lastMoveFrom);
            if (fromSq) fromSq.classList.add('last-move');
        }
        if (gameState.lastMoveTo) {
            const toSq = this.getSquareElement(gameState.lastMoveTo);
            if (toSq) toSq.classList.add('last-move');
        }

        // Highlight King in Check
        if (gameState.check && gameState.checkSquare) {
            const checkSq = this.getSquareElement(gameState.checkSquare);
            if (checkSq) checkSq.classList.add('king-check');
        }
    }

    handleSquareClick(notation, event) {
        if (this.onSquareClickCallback) {
            this.onSquareClickCallback(notation);
        }
    }

    /**
     * Highlights legal destination squares in GREEN.
     */
    showLegalMoves(fromNotation, legalMovesList) {
        this.clearHighlights();
        this.selectedSquare = fromNotation;
        this.legalMoves = legalMovesList || [];

        // Highlight selected square
        const selectedEl = this.getSquareElement(fromNotation);
        if (selectedEl) {
            selectedEl.classList.add('selected-square');
        }

        // Add GREEN highlights to valid target squares
        this.legalMoves.forEach(targetNotation => {
            const targetSquare = this.getSquareElement(targetNotation);
            if (targetSquare) {
                const hasPiece = targetSquare.querySelector('.chess-piece');
                if (hasPiece) {
                    // Capture Move: Green Outer Ring / Halo
                    const ring = document.createElement('div');
                    ring.className = 'legal-capture-ring';
                    targetSquare.appendChild(ring);
                } else {
                    // Move to Empty Square: Green Glowing Dot
                    const dot = document.createElement('div');
                    dot.className = 'legal-move-dot';
                    targetSquare.appendChild(dot);
                }
            }
        });
    }

    clearHighlights() {
        const dotsAndRings = this.boardElement.querySelectorAll('.legal-move-dot, .legal-capture-ring');
        dotsAndRings.forEach(el => el.remove());

        const selected = this.boardElement.querySelectorAll('.selected-square');
        selected.forEach(el => el.classList.remove('selected-square'));

        this.selectedSquare = null;
        this.legalMoves = [];
    }

    getSquareElement(notation) {
        return this.boardElement.querySelector(`[data-notation="${notation}"]`);
    }

    setSquareClickCallback(callback) {
        this.onSquareClickCallback = callback;
    }
}
