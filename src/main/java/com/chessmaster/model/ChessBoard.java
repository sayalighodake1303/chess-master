package com.chessmaster.model;

import com.chessmaster.model.piece.*;

import java.util.ArrayList;
import java.util.List;

public class ChessBoard {
    private final ChessPiece[][] squares = new ChessPiece[8][8];
    private Position whiteKingPos;
    private Position blackKingPos;
    private Position enPassantTarget; // Square behind double-moved pawn
    private int halfMoveClock = 0;   // 50-move rule counter
    private int fullMoveNumber = 1;

    public ChessBoard() {
    }

    public void initStandardBoard() {
        // Clear board
        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 8; c++) {
                squares[r][c] = null;
            }
        }

        // Black major pieces (Row 0, Rank 8)
        squares[0][0] = new Rook(Color.BLACK, new Position(0, 0));
        squares[0][1] = new Knight(Color.BLACK, new Position(0, 1));
        squares[0][2] = new Bishop(Color.BLACK, new Position(0, 2));
        squares[0][3] = new Queen(Color.BLACK, new Position(0, 3));
        squares[0][4] = new King(Color.BLACK, new Position(0, 4));
        squares[0][5] = new Bishop(Color.BLACK, new Position(0, 5));
        squares[0][6] = new Knight(Color.BLACK, new Position(0, 6));
        squares[0][7] = new Rook(Color.BLACK, new Position(0, 7));
        blackKingPos = new Position(0, 4);

        // Black pawns (Row 1, Rank 7)
        for (int c = 0; c < 8; c++) {
            squares[1][c] = new Pawn(Color.BLACK, new Position(1, c));
        }

        // White pawns (Row 6, Rank 2)
        for (int c = 0; c < 8; c++) {
            squares[6][c] = new Pawn(Color.WHITE, new Position(6, c));
        }

        // White major pieces (Row 7, Rank 1)
        squares[7][0] = new Rook(Color.WHITE, new Position(7, 0));
        squares[7][1] = new Knight(Color.WHITE, new Position(7, 1));
        squares[7][2] = new Bishop(Color.WHITE, new Position(7, 2));
        squares[7][3] = new Queen(Color.WHITE, new Position(7, 3));
        squares[7][4] = new King(Color.WHITE, new Position(7, 4));
        squares[7][5] = new Bishop(Color.WHITE, new Position(7, 5));
        squares[7][6] = new Knight(Color.WHITE, new Position(7, 6));
        squares[7][7] = new Rook(Color.WHITE, new Position(7, 7));
        whiteKingPos = new Position(7, 4);

        enPassantTarget = null;
        halfMoveClock = 0;
        fullMoveNumber = 1;
    }

    public ChessPiece getPieceAt(int row, int col) {
        if (!Position.isValid(row, col)) return null;
        return squares[row][col];
    }

    public ChessPiece getPieceAt(Position pos) {
        if (pos == null || !pos.isValid()) return null;
        return squares[pos.getRow()][pos.getCol()];
    }

    public void setPieceAt(int row, int col, ChessPiece piece) {
        if (Position.isValid(row, col)) {
            squares[row][col] = piece;
            if (piece != null) {
                piece.setPosition(new Position(row, col));
                if (piece.getType() == PieceType.KING) {
                    if (piece.getColor() == Color.WHITE) {
                        whiteKingPos = new Position(row, col);
                    } else {
                        blackKingPos = new Position(row, col);
                    }
                }
            }
        }
    }

    public void setPieceAt(Position pos, ChessPiece piece) {
        if (pos != null && pos.isValid()) {
            setPieceAt(pos.getRow(), pos.getCol(), piece);
        }
    }

    public Position getKingPosition(Color color) {
        return (color == Color.WHITE) ? whiteKingPos : blackKingPos;
    }

    public Position getEnPassantTarget() {
        return enPassantTarget;
    }

    public void setEnPassantTarget(Position enPassantTarget) {
        this.enPassantTarget = enPassantTarget;
    }

    public int getHalfMoveClock() {
        return halfMoveClock;
    }

    public void setHalfMoveClock(int halfMoveClock) {
        this.halfMoveClock = halfMoveClock;
    }

    public int getFullMoveNumber() {
        return fullMoveNumber;
    }

    public void setFullMoveNumber(int fullMoveNumber) {
        this.fullMoveNumber = fullMoveNumber;
    }

    public List<ChessPiece> getPiecesByColor(Color color) {
        List<ChessPiece> pieces = new ArrayList<>();
        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 8; c++) {
                ChessPiece p = squares[r][c];
                if (p != null && p.getColor() == color) {
                    pieces.add(p);
                }
            }
        }
        return pieces;
    }

    /**
     * Checks if a target square is attacked by any piece of the attackingColor.
     */
    public boolean isSquareAttacked(Position targetPos, Color attackingColor) {
        if (targetPos == null || !targetPos.isValid()) return false;
        int tr = targetPos.getRow();
        int tc = targetPos.getCol();

        // 1. Attacked by Pawns
        int pawnAttackRow = (attackingColor == Color.WHITE) ? tr + 1 : tr - 1;
        if (Position.isValid(pawnAttackRow, tc - 1)) {
            ChessPiece p = squares[pawnAttackRow][tc - 1];
            if (p instanceof Pawn && p.getColor() == attackingColor) return true;
        }
        if (Position.isValid(pawnAttackRow, tc + 1)) {
            ChessPiece p = squares[pawnAttackRow][tc + 1];
            if (p instanceof Pawn && p.getColor() == attackingColor) return true;
        }

        // 2. Attacked by Knights
        int[][] knightOffsets = {{-2, -1}, {-2, 1}, {-1, -2}, {-1, 2}, {1, -2}, {1, 2}, {2, -1}, {2, 1}};
        for (int[] off : knightOffsets) {
            int nr = tr + off[0];
            int nc = tc + off[1];
            if (Position.isValid(nr, nc)) {
                ChessPiece p = squares[nr][nc];
                if (p instanceof Knight && p.getColor() == attackingColor) return true;
            }
        }

        // 3. Attacked by Kings (1 square)
        int[][] kingOffsets = {{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1}};
        for (int[] off : kingOffsets) {
            int nr = tr + off[0];
            int nc = tc + off[1];
            if (Position.isValid(nr, nc)) {
                ChessPiece p = squares[nr][nc];
                if (p instanceof King && p.getColor() == attackingColor) return true;
            }
        }

        // 4. Attacked along Orthogonals (Rook or Queen)
        int[][] orthDirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (int[] dir : orthDirs) {
            int r = tr + dir[0];
            int c = tc + dir[1];
            while (Position.isValid(r, c)) {
                ChessPiece p = squares[r][c];
                if (p != null) {
                    if (p.getColor() == attackingColor && (p instanceof Rook || p instanceof Queen)) {
                        return true;
                    }
                    break;
                }
                r += dir[0];
                c += dir[1];
            }
        }

        // 5. Attacked along Diagonals (Bishop or Queen)
        int[][] diagDirs = {{-1, -1}, {-1, 1}, {1, -1}, {1, 1}};
        for (int[] dir : diagDirs) {
            int r = tr + dir[0];
            int c = tc + dir[1];
            while (Position.isValid(r, c)) {
                ChessPiece p = squares[r][c];
                if (p != null) {
                    if (p.getColor() == attackingColor && (p instanceof Bishop || p instanceof Queen)) {
                        return true;
                    }
                    break;
                }
                r += dir[0];
                c += dir[1];
            }
        }

        return false;
    }

    public boolean isKingInCheck(Color color) {
        Position kingPos = getKingPosition(color);
        if (kingPos == null) return false;
        return isSquareAttacked(kingPos, color.opposite());
    }

    /**
     * Creates a deep copy of the board for move simulation.
     */
    public ChessBoard copy() {
        ChessBoard clone = new ChessBoard();
        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 8; c++) {
                if (this.squares[r][c] != null) {
                    clone.squares[r][c] = this.squares[r][c].copy();
                }
            }
        }
        if (this.whiteKingPos != null) {
            clone.whiteKingPos = new Position(this.whiteKingPos.getRow(), this.whiteKingPos.getCol());
        }
        if (this.blackKingPos != null) {
            clone.blackKingPos = new Position(this.blackKingPos.getRow(), this.blackKingPos.getCol());
        }
        if (this.enPassantTarget != null) {
            clone.enPassantTarget = new Position(this.enPassantTarget.getRow(), this.enPassantTarget.getCol());
        }
        clone.halfMoveClock = this.halfMoveClock;
        clone.fullMoveNumber = this.fullMoveNumber;
        return clone;
    }

    /**
     * Checks for insufficient mating material according to FIDE rules:
     * - K vs K
     * - K+B vs K
     * - K+N vs K
     * - K+B vs K+B (same color bishop squares)
     */
    public boolean hasInsufficientMaterial() {
        List<ChessPiece> whitePieces = getPiecesByColor(Color.WHITE);
        List<ChessPiece> blackPieces = getPiecesByColor(Color.BLACK);

        int whiteCount = whitePieces.size();
        int blackCount = blackPieces.size();

        // K vs K
        if (whiteCount == 1 && blackCount == 1) return true;

        // K+B or K+N vs K
        if (whiteCount == 2 && blackCount == 1) {
            ChessPiece minor = whitePieces.stream().filter(p -> p.getType() != PieceType.KING).findFirst().orElse(null);
            if (minor instanceof Bishop || minor instanceof Knight) return true;
        }
        if (whiteCount == 1 && blackCount == 2) {
            ChessPiece minor = blackPieces.stream().filter(p -> p.getType() != PieceType.KING).findFirst().orElse(null);
            if (minor instanceof Bishop || minor instanceof Knight) return true;
        }

        // K+B vs K+B on same colored square
        if (whiteCount == 2 && blackCount == 2) {
            ChessPiece whiteMinor = whitePieces.stream().filter(p -> p.getType() != PieceType.KING).findFirst().orElse(null);
            ChessPiece blackMinor = blackPieces.stream().filter(p -> p.getType() != PieceType.KING).findFirst().orElse(null);
            if (whiteMinor instanceof Bishop && blackMinor instanceof Bishop) {
                boolean whiteBishopSquareLight = (whiteMinor.getPosition().getRow() + whiteMinor.getPosition().getCol()) % 2 == 0;
                boolean blackBishopSquareLight = (blackMinor.getPosition().getRow() + blackMinor.getPosition().getCol()) % 2 == 0;
                if (whiteBishopSquareLight == blackBishopSquareLight) return true;
            }
        }

        return false;
    }

    /**
     * Converts board state to FEN string for persistence and validation.
     */
    public String toFEN(Color activeColor) {
        StringBuilder fen = new StringBuilder();
        for (int r = 0; r < 8; r++) {
            int empty = 0;
            for (int c = 0; c < 8; c++) {
                ChessPiece p = squares[r][c];
                if (p == null) {
                    empty++;
                } else {
                    if (empty > 0) {
                        fen.append(empty);
                        empty = 0;
                    }
                    char sym = p.getType().getSymbol().charAt(0);
                    fen.append(p.getColor() == Color.WHITE ? Character.toUpperCase(sym) : Character.toLowerCase(sym));
                }
            }
            if (empty > 0) {
                fen.append(empty);
            }
            if (r < 7) fen.append("/");
        }

        fen.append(" ").append(activeColor == Color.WHITE ? "w" : "b").append(" ");

        // Castling availability
        StringBuilder castling = new StringBuilder();
        ChessPiece wk = getPieceAt(7, 4);
        if (wk instanceof King && !wk.isHasMoved()) {
            ChessPiece wkr = getPieceAt(7, 7);
            if (wkr instanceof Rook && !wkr.isHasMoved()) castling.append("K");
            ChessPiece wqr = getPieceAt(7, 0);
            if (wqr instanceof Rook && !wqr.isHasMoved()) castling.append("Q");
        }
        ChessPiece bk = getPieceAt(0, 4);
        if (bk instanceof King && !bk.isHasMoved()) {
            ChessPiece bkr = getPieceAt(0, 7);
            if (bkr instanceof Rook && !bkr.isHasMoved()) castling.append("k");
            ChessPiece bqr = getPieceAt(0, 0);
            if (bqr instanceof Rook && !bqr.isHasMoved()) castling.append("q");
        }
        if (castling.length() == 0) castling.append("-");
        fen.append(castling).append(" ");

        // En passant
        if (enPassantTarget != null) {
            fen.append(enPassantTarget.toNotation());
        } else {
            fen.append("-");
        }

        fen.append(" ").append(halfMoveClock).append(" ").append(fullMoveNumber);
        return fen.toString();
    }
}
