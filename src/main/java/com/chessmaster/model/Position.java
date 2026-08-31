package com.chessmaster.model;

import java.util.Objects;

public class Position {
    private final int row; // 0 to 7 (0 is rank 8, 7 is rank 1)
    private final int col; // 0 to 7 (0 is file a, 7 is file h)

    public Position(int row, int col) {
        this.row = row;
        this.col = col;
    }

    public int getRow() {
        return row;
    }

    public int getCol() {
        return col;
    }

    public boolean isValid() {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    public static boolean isValid(int row, int col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    public String toNotation() {
        char file = (char) ('a' + col);
        int rank = 8 - row;
        return "" + file + rank;
    }

    public static Position fromNotation(String notation) {
        if (notation == null || notation.length() < 2) {
            throw new IllegalArgumentException("Invalid chess notation: " + notation);
        }
        String clean = notation.trim().toLowerCase();
        char file = clean.charAt(0);
        char rankChar = clean.charAt(1);

        int col = file - 'a';
        int rank = Character.getNumericValue(rankChar);
        int row = 8 - rank;

        if (!isValid(row, col)) {
            throw new IllegalArgumentException("Position out of bounds: " + notation);
        }
        return new Position(row, col);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Position that)) return false;
        return row == that.row && col == that.col;
    }

    @Override
    public int hashCode() {
        return Objects.hash(row, col);
    }

    @Override
    public String toString() {
        return toNotation();
    }
}
