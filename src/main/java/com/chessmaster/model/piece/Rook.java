package com.chessmaster.model.piece;

import com.chessmaster.model.ChessBoard;
import com.chessmaster.model.Color;
import com.chessmaster.model.PieceType;
import com.chessmaster.model.Position;

import java.util.ArrayList;
import java.util.List;

public class Rook extends ChessPiece {

    private static final int[][] ROOK_DIRECTIONS = {
            {-1, 0}, {1, 0},
            {0, -1}, {0, 1}
    };

    public Rook(Color color, Position position) {
        super(PieceType.ROOK, color, position);
    }

    public Rook(Color color, Position position, boolean hasMoved) {
        super(PieceType.ROOK, color, position, hasMoved);
    }

    @Override
    public List<Position> getPseudoLegalMoves(ChessBoard board) {
        List<Position> moves = new ArrayList<>();
        int currentRow = position.getRow();
        int currentCol = position.getCol();

        for (int[] dir : ROOK_DIRECTIONS) {
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
                    break;
                }
                r += dir[0];
                c += dir[1];
            }
        }

        return moves;
    }

    @Override
    public ChessPiece copy() {
        return new Rook(this.color, new Position(this.position.getRow(), this.position.getCol()), this.hasMoved);
    }
}
