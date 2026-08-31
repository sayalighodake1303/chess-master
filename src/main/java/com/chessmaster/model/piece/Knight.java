package com.chessmaster.model.piece;

import com.chessmaster.model.ChessBoard;
import com.chessmaster.model.Color;
import com.chessmaster.model.PieceType;
import com.chessmaster.model.Position;

import java.util.ArrayList;
import java.util.List;

public class Knight extends ChessPiece {

    private static final int[][] KNIGHT_OFFSETS = {
            {-2, -1}, {-2, 1},
            {-1, -2}, {-1, 2},
            {1, -2}, {1, 2},
            {2, -1}, {2, 1}
    };

    public Knight(Color color, Position position) {
        super(PieceType.KNIGHT, color, position);
    }

    public Knight(Color color, Position position, boolean hasMoved) {
        super(PieceType.KNIGHT, color, position, hasMoved);
    }

    @Override
    public List<Position> getPseudoLegalMoves(ChessBoard board) {
        List<Position> moves = new ArrayList<>();
        int currentRow = position.getRow();
        int currentCol = position.getCol();

        for (int[] offset : KNIGHT_OFFSETS) {
            int newRow = currentRow + offset[0];
            int newCol = currentCol + offset[1];

            if (Position.isValid(newRow, newCol)) {
                ChessPiece target = board.getPieceAt(newRow, newCol);
                if (target == null || target.getColor() != this.color) {
                    moves.add(new Position(newRow, newCol));
                }
            }
        }

        return moves;
    }

    @Override
    public ChessPiece copy() {
        return new Knight(this.color, new Position(this.position.getRow(), this.position.getCol()), this.hasMoved);
    }
}
