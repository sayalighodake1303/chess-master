package com.chessmaster.service;

import com.chessmaster.model.*;
import com.chessmaster.model.piece.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MoveService {

    public static class MoveOption {
        private final Position from;
        private final Position to;
        private final PieceType pieceType;

        public MoveOption(Position from, Position to, PieceType pieceType) {
            this.from = from;
            this.to = to;
            this.pieceType = pieceType;
        }

        public Position getFrom() {
            return from;
        }

        public Position getTo() {
            return to;
        }

        public PieceType getPieceType() {
            return pieceType;
        }
    }

    /**
     * Calculates strictly legal moves for a specific piece, filtering out moves that leave king in check.
     */
    public List<Position> getLegalMoves(ChessBoard board, Position from) {
        List<Position> legalMoves = new ArrayList<>();
        if (board == null || from == null || !from.isValid()) {
            return legalMoves;
        }

        ChessPiece piece = board.getPieceAt(from);
        if (piece == null) {
            return legalMoves;
        }

        List<Position> pseudoLegalMoves = piece.getPseudoLegalMoves(board);
        for (Position to : pseudoLegalMoves) {
            if (isMoveLegal(board, from, to, piece.getColor())) {
                legalMoves.add(to);
            }
        }

        return legalMoves;
    }

    /**
     * Retrieves all legal moves available for a given player color.
     */
    public List<MoveOption> getAllLegalMoves(ChessBoard board, Color color) {
        List<MoveOption> allMoves = new ArrayList<>();
        List<ChessPiece> pieces = board.getPiecesByColor(color);

        for (ChessPiece piece : pieces) {
            List<Position> targets = getLegalMoves(board, piece.getPosition());
            for (Position to : targets) {
                allMoves.add(new MoveOption(piece.getPosition(), to, piece.getType()));
            }
        }

        return allMoves;
    }

    /**
     * Tests whether moving a piece from 'from' to 'to' leaves the moving player's king in check.
     */
    public boolean isMoveLegal(ChessBoard board, Position from, Position to, Color playerColor) {
        ChessBoard simBoard = board.copy();
        applyMoveToBoard(simBoard, from, to, PieceType.QUEEN);
        return !simBoard.isKingInCheck(playerColor);
    }

    /**
     * Applies a move to the board (handles captures, en passant, castling, promotion).
     */
    public void applyMoveToBoard(ChessBoard board, Position from, Position to, PieceType promotionType) {
        ChessPiece movingPiece = board.getPieceAt(from);
        if (movingPiece == null) return;

        int fromRow = from.getRow();
        int fromCol = from.getCol();
        int toRow = to.getRow();
        int toCol = to.getCol();

        // 1. Check for En Passant capture
        if (movingPiece instanceof Pawn && board.getEnPassantTarget() != null) {
            if (to.equals(board.getEnPassantTarget())) {
                // Remove the captured pawn
                int capturedPawnRow = (movingPiece.getColor() == Color.WHITE) ? toRow + 1 : toRow - 1;
                board.setPieceAt(capturedPawnRow, toCol, null);
            }
        }

        // 2. Check for Castling move (King moving 2 squares horizontally)
        if (movingPiece instanceof King && Math.abs(toCol - fromCol) == 2) {
            if (toCol == 6) {
                // Kingside: move rook from col 7 to col 5
                ChessPiece rook = board.getPieceAt(fromRow, 7);
                board.setPieceAt(fromRow, 7, null);
                if (rook != null) {
                    rook.setHasMoved(true);
                    board.setPieceAt(fromRow, 5, rook);
                }
            } else if (toCol == 2) {
                // Queenside: move rook from col 0 to col 3
                ChessPiece rook = board.getPieceAt(fromRow, 0);
                board.setPieceAt(fromRow, 0, null);
                if (rook != null) {
                    rook.setHasMoved(true);
                    board.setPieceAt(fromRow, 3, rook);
                }
            }
        }

        // 3. Update En Passant Target for next turn
        if (movingPiece instanceof Pawn && Math.abs(toRow - fromRow) == 2) {
            int jumpTargetRow = (fromRow + toRow) / 2;
            board.setEnPassantTarget(new Position(jumpTargetRow, fromCol));
        } else {
            board.setEnPassantTarget(null);
        }

        // 4. Move piece to target square
        board.setPieceAt(from, null);
        movingPiece.setHasMoved(true);

        // 5. Pawn Promotion
        if (movingPiece instanceof Pawn && (toRow == 0 || toRow == 7)) {
            PieceType promType = (promotionType != null) ? promotionType : PieceType.QUEEN;
            ChessPiece promotedPiece = createPromotedPiece(promType, movingPiece.getColor(), to);
            promotedPiece.setHasMoved(true);
            board.setPieceAt(to, promotedPiece);
        } else {
            board.setPieceAt(to, movingPiece);
        }
    }

    private ChessPiece createPromotedPiece(PieceType type, Color color, Position position) {
        return switch (type) {
            case ROOK -> new Rook(color, position, true);
            case KNIGHT -> new Knight(color, position, true);
            case BISHOP -> new Bishop(color, position, true);
            default -> new Queen(color, position, true);
        };
    }

    public boolean isCheckmate(ChessBoard board, Color color) {
        return board.isKingInCheck(color) && getAllLegalMoves(board, color).isEmpty();
    }

    public boolean isStalemate(ChessBoard board, Color color) {
        return !board.isKingInCheck(color) && getAllLegalMoves(board, color).isEmpty();
    }

    /**
     * Formats the move in Standard Algebraic Notation (SAN).
     */
    public String formatSAN(ChessBoard beforeBoard, Position from, Position to,
                            ChessPiece movingPiece, ChessPiece capturedPiece,
                            boolean isCastling, boolean isEnPassant, PieceType promotion,
                            boolean isCheck, boolean isCheckmate) {
        if (isCastling) {
            String castleNotation = (to.getCol() == 6) ? "O-O" : "O-O-O";
            if (isCheckmate) return castleNotation + "#";
            if (isCheck) return castleNotation + "+";
            return castleNotation;
        }

        StringBuilder san = new StringBuilder();
        PieceType type = movingPiece.getType();

        if (type == PieceType.PAWN) {
            if (capturedPiece != null || isEnPassant) {
                san.append((char) ('a' + from.getCol()));
                san.append("x");
            }
            san.append(to.toNotation());
            if (to.getRow() == 0 || to.getRow() == 7) {
                PieceType prom = (promotion != null) ? promotion : PieceType.QUEEN;
                san.append("=").append(prom.getSymbol());
            }
        } else {
            san.append(type.getSymbol());
            if (capturedPiece != null) {
                san.append("x");
            }
            san.append(to.toNotation());
        }

        if (isCheckmate) {
            san.append("#");
        } else if (isCheck) {
            san.append("+");
        }

        return san.toString();
    }
}
