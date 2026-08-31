package com.chessmaster.dto;

import com.chessmaster.model.Color;
import com.chessmaster.model.PieceType;

public class PieceDTO {
    private PieceType type;
    private Color color;
    private String position; // e.g. "e4"
    private int row;
    private int col;
    private boolean hasMoved;

    public PieceDTO() {
    }

    public PieceDTO(PieceType type, Color color, String position, int row, int col, boolean hasMoved) {
        this.type = type;
        this.color = color;
        this.position = position;
        this.row = row;
        this.col = col;
        this.hasMoved = hasMoved;
    }

    public PieceType getType() {
        return type;
    }

    public void setType(PieceType type) {
        this.type = type;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getCol() {
        return col;
    }

    public void setCol(int col) {
        this.col = col;
    }

    public boolean isHasMoved() {
        return hasMoved;
    }

    public void setHasMoved(boolean hasMoved) {
        this.hasMoved = hasMoved;
    }
}
