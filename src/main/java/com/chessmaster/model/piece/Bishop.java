package com.chessmaster.model.piece;

import com.chessmaster.model.ChessBoard;
import com.chessmaster.model.Color;
import com.chessmaster.model.PieceType;
import com.chessmaster.model.Position;

import java.util.ArrayList;
import java.util.List;

public class Bishop extends ChessPiece {

    private static final int[][] BISHOP_DIRECTIONS = {
            {-1, -1}, {-1, 1},
            {1, -1}, {1, 1}
    };

    public Bishop(Color color, Position position) {
        super(PieceType.BISHOP, color, position);
    }

    public Bishop(Color color, Position position, boolean hasMoved) {
        super(PieceType.BISHOP, color, position, hasMoved);
    }

    @Override
    public List<Position> getPseudoLegalMoves(ChessBoard board) {
        List<Position> moves = new ArrayList<>();
        int currentRow = position.getRow();
        int currentCol = position.getCol();

        for (int[] dir : BISHOP_DIRECTIONS) {
            int r = currentRow + dir[0];
            int c = currentCol + dir[1];

            while (Position.isValid(r, c)) {
                ChessPiece target = board.getPieceAt(r, c);
                if (target == null) {
                    moves.add(new Position(r, c));
                } else {
                    if (target.getColor() != this.color) {
                        moves.add(new Position(r, c));
                    }
                    break; // Blocked by piece
                }
                r += dir[0];
                c += dir[1];
            }
        }

        return moves;
    }

    @Override
    public ChessPiece copy() {
        return new Bishop(this.color, new Position(this.position.getRow(), this.position.getCol()), this.hasMoved);
    }
}
