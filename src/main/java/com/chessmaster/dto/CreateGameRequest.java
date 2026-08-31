package com.chessmaster.dto;

import com.chessmaster.model.Color;
import com.chessmaster.model.Difficulty;
import com.chessmaster.model.GameMode;

public class CreateGameRequest {
    private String playerWhiteName = "White";
    private String playerBlackName = "Black";
    private GameMode gameMode = GameMode.FRIEND;
    private Difficulty difficulty = Difficulty.MEDIUM;
    private Color userColor = Color.WHITE;
    private int timeControlMinutes = 10;

    public CreateGameRequest() {
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

    public int getTimeControlMinutes() {
        return timeControlMinutes;
    }

    public void setTimeControlMinutes(int timeControlMinutes) {
        this.timeControlMinutes = timeControlMinutes;
    }
}
