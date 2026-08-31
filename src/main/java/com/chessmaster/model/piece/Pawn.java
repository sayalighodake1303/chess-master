package com.chessmaster.model.piece;

import com.chessmaster.model.ChessBoard;
import com.chessmaster.model.Color;
import com.chessmaster.model.PieceType;
import com.chessmaster.model.Position;

import java.util.ArrayList;
import java.util.List;

public class Pawn extends ChessPiece {

    public Pawn(Color color, Position position) {
        super(PieceType.PAWN, color, position);
    }

    public Pawn(Color color, Position position, boolean hasMoved) {
        super(PieceType.PAWN, color, position, hasMoved);
    }

    @Override
    public List<Position> getPseudoLegalMoves(ChessBoard board) {
        List<Position> moves = new ArrayList<>();
        int direction = (color == Color.WHITE) ? -1 : 1;
        int startRow = (color == Color.WHITE) ? 6 : 1;

        int currentRow = position.getRow();
        int currentCol = position.getCol();

        // 1 square forward
        int forwardRow = currentRow + direction;
        if (Position.isValid(forwardRow, currentCol) && board.getPieceAt(forwardRow, currentCol) == null) {
            moves.add(new Position(forwardRow, currentCol));

            // 2 squares forward from starting rank
            int doubleForwardRow = currentRow + 2 * direction;
            if (currentRow == startRow && board.getPieceAt(doubleForwardRow, currentCol) == null) {
                moves.add(new Position(doubleForwardRow, currentCol));
            }
        }

        // Diagonal captures
        int[] captureCols = {currentCol - 1, currentCol + 1};
        for (int c : captureCols) {
            if (Position.isValid(forwardRow, c)) {
                ChessPiece targetPiece = board.getPieceAt(forwardRow, c);
                // Standard capture
                if (targetPiece != null && targetPiece.getColor() != this.color) {
                    moves.add(new Position(forwardRow, c));
                }
                // En Passant capture
                Position enPassantTarget = board.getEnPassantTarget();
                if (enPassantTarget != null && enPassantTarget.getRow() == forwardRow && enPassantTarget.getCol() == c) {
                    moves.add(new Position(forwardRow, c));
                }
            }
        }

        return moves;
    }

    @Override
    public ChessPiece copy() {
        return new Pawn(this.color, new Position(this.position.getRow(), this.position.getCol()), this.hasMoved);
    }
}
