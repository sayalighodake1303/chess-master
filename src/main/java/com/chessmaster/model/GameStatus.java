package com.chessmaster.model;

public enum GameStatus {
    IN_PROGRESS,
    WHITE_WON_CHECKMATE,
    BLACK_WON_CHECKMATE,
    WHITE_WON_RESIGN,
    BLACK_WON_RESIGN,
    DRAW_STALEMATE,
    DRAW_INSUFFICIENT_MATERIAL,
    DRAW_50_MOVES,
    DRAW_AGREEMENT,
    TIME_OUT_WHITE_WON,
    TIME_OUT_BLACK_WON;

    public boolean isGameOver() {
        return this != IN_PROGRESS;
    }
}
