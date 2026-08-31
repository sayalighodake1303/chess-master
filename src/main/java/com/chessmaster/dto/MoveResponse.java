package com.chessmaster.dto;

import com.chessmaster.model.PieceType;

public class MoveResponse {
    private boolean success;
    private String message;
    private GameResponse gameState;
    private String san;
    private boolean isCheck;
    private boolean isCheckmate;
    private boolean isDraw;
    private String from;
    private String to;
    private PieceType capturedPiece;

    public MoveResponse() {
    }

    public MoveResponse(boolean success, String message, GameResponse gameState) {
        this.success = success;
        this.message = message;
        this.gameState = gameState;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public GameResponse getGameState() {
        return gameState;
    }

    public void setGameState(GameResponse gameState) {
        this.gameState = gameState;
    }

    public String getSan() {
        return san;
    }

    public void setSan(String san) {
        this.san = san;
    }

    public boolean isCheck() {
        return isCheck;
    }

    public void setCheck(boolean check) {
        isCheck = check;
    }

    public boolean isCheckmate() {
        return isCheckmate;
    }

    public void setCheckmate(boolean checkmate) {
        isCheckmate = checkmate;
    }

    public boolean isDraw() {
        return isDraw;
    }

    public void setDraw(boolean draw) {
        isDraw = draw;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public PieceType getCapturedPiece() {
        return capturedPiece;
    }

    public void setCapturedPiece(PieceType capturedPiece) {
        this.capturedPiece = capturedPiece;
    }
}
