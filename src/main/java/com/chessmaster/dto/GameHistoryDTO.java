package com.chessmaster.dto;

import com.chessmaster.model.Difficulty;
import com.chessmaster.model.GameMode;
import com.chessmaster.model.GameStatus;

import java.time.LocalDateTime;

public class GameHistoryDTO {
    private Long id;
    private String playerWhiteName;
    private String playerBlackName;
    private GameMode gameMode;
    private Difficulty difficulty;
    private GameStatus gameStatus;
    private String winner;
    private int moveCount;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public GameHistoryDTO() {
    }

    public GameHistoryDTO(Long id, String playerWhiteName, String playerBlackName, GameMode gameMode,
                          Difficulty difficulty, GameStatus gameStatus, String winner, int moveCount,
                          LocalDateTime startTime, LocalDateTime endTime) {
        this.id = id;
        this.playerWhiteName = playerWhiteName;
        this.playerBlackName = playerBlackName;
        this.gameMode = gameMode;
        this.difficulty = difficulty;
        this.gameStatus = gameStatus;
        this.winner = winner;
        this.moveCount = moveCount;
        this.startTime = startTime;
        this.endTime = endTime;
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

    public int getMoveCount() {
        return moveCount;
    }

    public void setMoveCount(int moveCount) {
        this.moveCount = moveCount;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
}
