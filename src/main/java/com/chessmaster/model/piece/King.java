package com.chessmaster.model.piece;

import com.chessmaster.model.ChessBoard;
import com.chessmaster.model.Color;
import com.chessmaster.model.PieceType;
import com.chessmaster.model.Position;

import java.util.ArrayList;
import java.util.List;

public class King extends ChessPiece {

    private static final int[][] KING_OFFSETS = {
            {-1, -1}, {-1, 0}, {-1, 1},
            {0, -1},           {0, 1},
            {1, -1},  {1, 0},  {1, 1}
    };

    public King(Color color, Position position) {
        super(PieceType.KING, color, position);
    }

    public King(Color color, Position position, boolean hasMoved) {
        super(PieceType.KING, color, position, hasMoved);
    }

    @Override
    public List<Position> getPseudoLegalMoves(ChessBoard board) {
        List<Position> moves = new ArrayList<>();
        int currentRow = position.getRow();
        int currentCol = position.getCol();

        // 1-square movement in 8 directions
        for (int[] offset : KING_OFFSETS) {
            int r = currentRow + offset[0];
            int c = currentCol + offset[1];

            if (Position.isValid(r, c)) {
                ChessPiece target = board.getPieceAt(r, c);
                if (target == null || target.getColor() != this.color) {
                    moves.add(new Position(r, c));
                }
            }
        }

        // Castling moves
        if (!this.hasMoved && !board.isKingInCheck(this.color)) {
            Color oppColor = this.color.opposite();
            int row = (this.color == Color.WHITE) ? 7 : 0;

            if (currentRow == row && currentCol == 4) {
                // Kingside Castling (O-O): Target (row, 6)
                ChessPiece kingsideRook = board.getPieceAt(row, 7);
                if (kingsideRook instanceof Rook && kingsideRook.getColor() == this.color && !kingsideRook.isHasMoved()) {
                    if (board.getPieceAt(row, 5) == null && board.getPieceAt(row, 6) == null) {
                        if (!board.isSquareAttacked(new Position(row, 5), oppColor) &&
                            !board.isSquareAttacked(new Position(row, 6), oppColor)) {
                            moves.add(new Position(row, 6));
                        }
                    }
                }

                // Queenside Castling (O-O-O): Target (row, 2)
                ChessPiece queensideRook = board.getPieceAt(row, 0);
                if (queensideRook instanceof Rook && queensideRook.getColor() == this.color && !queensideRook.isHasMoved()) {
                    if (board.getPieceAt(row, 1) == null && board.getPieceAt(row, 2) == null && board.getPieceAt(row, 3) == null) {
                        if (!board.isSquareAttacked(new Position(row, 3), oppColor) &&
                            !board.isSquareAttacked(new Position(row, 2), oppColor)) {
                            moves.add(new Position(row, 2));
                        }
                    }
                }
            }
        }

        return moves;
    }

    @Override
    public ChessPiece copy() {
        return new King(this.color, new Position(this.position.getRow(), this.position.getCol()), this.hasMoved);
    }
}
