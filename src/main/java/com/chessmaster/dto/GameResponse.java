package com.chessmaster.dto;

import com.chessmaster.model.Color;
import com.chessmaster.model.Difficulty;
import com.chessmaster.model.GameMode;
import com.chessmaster.model.GameStatus;

import java.util.ArrayList;
import java.util.List;

public class GameResponse {
    private Long id;
    private String playerWhiteName;
    private String playerBlackName;
    private GameMode gameMode;
    private Difficulty difficulty;
    private Color userColor;
    private Color currentTurn;
    private GameStatus gameStatus;
    private String winner;
    private boolean isCheck;
    private String checkSquare; // King position in check e.g. "e1"
    private List<PieceDTO> pieces = new ArrayList<>();
    private List<PieceDTO> capturedPieces = new ArrayList<>();
    private List<String> moveHistory = new ArrayList<>();
    private int remainingWhiteSeconds;
    private int remainingBlackSeconds;
    private String fen;
    private int fullMoveNumber;
    private String lastMoveFrom;
    private String lastMoveTo;

    public GameResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayerWhiteName() {
        return playerWhiteName;
    }

    public void setPlayerWhiteName(String playerWhiteName) {
        this.playerWhiteName = playerWhiteName;
    }

    public String getPlayerBlackName() {
        return playerBlackName;
    }

    public void setPlayerBlackName(String playerBlackName) {
        this.playerBlackName = playerBlackName;
    }

    public GameMode getGameMode() {
        return gameMode;
    }

    public void setGameMode(GameMode gameMode) {
        this.gameMode = gameMode;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public Color getUserColor() {
        return userColor;
    }

    public void setUserColor(Color userColor) {
        this.userColor = userColor;
    }

    public Color getCurrentTurn() {
        return currentTurn;
    }

    public void setCurrentTurn(Color currentTurn) {
        this.currentTurn = currentTurn;
    }

    public GameStatus getGameStatus() {
        return gameStatus;
    }

    public void setGameStatus(GameStatus gameStatus) {
        this.gameStatus = gameStatus;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public boolean isCheck() {
        return isCheck;
    }

    public void setCheck(boolean check) {
        isCheck = check;
    }

    public String getCheckSquare() {
        return checkSquare;
    }

    public void setCheckSquare(String checkSquare) {
        this.checkSquare = checkSquare;
    }

    public List<PieceDTO> getPieces() {
        return pieces;
    }

    public void setPieces(List<PieceDTO> pieces) {
        this.pieces = pieces;
    }

    public List<PieceDTO> getCapturedPieces() {
        return capturedPieces;
    }

    public void setCapturedPieces(List<PieceDTO> capturedPieces) {
        this.capturedPieces = capturedPieces;
    }

    public List<String> getMoveHistory() {
        return moveHistory;
    }

    public void setMoveHistory(List<String> moveHistory) {
        this.moveHistory = moveHistory;
    }

    public int getRemainingWhiteSeconds() {
        return remainingWhiteSeconds;
    }

    public void setRemainingWhiteSeconds(int remainingWhiteSeconds) {
        this.remainingWhiteSeconds = remainingWhiteSeconds;
    }

    public int getRemainingBlackSeconds() {
        return remainingBlackSeconds;
    }

    public void setRemainingBlackSeconds(int remainingBlackSeconds) {
        this.remainingBlackSeconds = remainingBlackSeconds;
    }

    public String getFen() {
        return fen;
    }

    public void setFen(String fen) {
        this.fen = fen;
    }

    public int getFullMoveNumber() {
        return fullMoveNumber;
    }

    public void setFullMoveNumber(int fullMoveNumber) {
        this.fullMoveNumber = fullMoveNumber;
    }

    public String getLastMoveFrom() {
        return lastMoveFrom;
    }

    public void setLastMoveFrom(String lastMoveFrom) {
        this.lastMoveFrom = lastMoveFrom;
    }

    public String getLastMoveTo() {
        return lastMoveTo;
    }

    public void setLastMoveTo(String lastMoveTo) {
        this.lastMoveTo = lastMoveTo;
    }
}
