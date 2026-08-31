package com.chessmaster.model.piece;

import com.chessmaster.model.ChessBoard;
import com.chessmaster.model.Color;
import com.chessmaster.model.PieceType;
import com.chessmaster.model.Position;

import java.util.List;

public abstract class ChessPiece {
    protected final PieceType type;
    protected final Color color;
    protected Position position;
    protected boolean hasMoved;

    public ChessPiece(PieceType type, Color color, Position position) {
        this.type = type;
        this.color = color;
        this.position = position;
        this.hasMoved = false;
    }

    public ChessPiece(PieceType type, Color color, Position position, boolean hasMoved) {
        this.type = type;
        this.color = color;
        this.position = position;
        this.hasMoved = hasMoved;
    }

    public PieceType getType() {
        return type;
    }

    public Color getColor() {
        return color;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public boolean isHasMoved() {
        return hasMoved;
    }

    public void setHasMoved(boolean hasMoved) {
        this.hasMoved = hasMoved;
    }

    public abstract List<Position> getPseudoLegalMoves(ChessBoard board);

    public abstract ChessPiece copy();

    @Override
    public String toString() {
        return (color == Color.WHITE ? "W_" : "B_") + type.getSymbol();
    }
}
