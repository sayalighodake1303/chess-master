package com.chessmaster.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_white_id")
    private Player playerWhite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_black_id")
    private Player playerBlack;

    @Column(name = "player_white_name", nullable = false)
    private String playerWhiteName = "White";

    @Column(name = "player_black_name", nullable = false)
    private String playerBlackName = "Black";

    @Enumerated(EnumType.STRING)
    @Column(name = "game_mode", nullable = false)
    private GameMode gameMode = GameMode.FRIEND;

    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty")
    private Difficulty difficulty;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_color")
    private Color userColor = Color.WHITE;

    @Enumerated(EnumType.STRING)
    @Column(name = "current_turn", nullable = false)
    private Color currentTurn = Color.WHITE;

    @Enumerated(EnumType.STRING)
    @Column(name = "game_status", nullable = false)
    private GameStatus gameStatus = GameStatus.IN_PROGRESS;

    @Column(name = "winner")
    private String winner;

    @Column(name = "time_control_minutes")
    private int timeControlMinutes = 10;

    @Column(name = "remaining_white_seconds")
    private int remainingWhiteSeconds = 600;

    @Column(name = "remaining_black_seconds")
    private int remainingBlackSeconds = 600;

    @Column(name = "fen", length = 500)
    private String fen;

    @Column(name = "start_time")
    private LocalDateTime startTime = LocalDateTime.now();

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("moveNumber ASC")
    private List<Move> moves = new ArrayList<>();

    @Transient
    private ChessBoard board;

    public Game() {
        this.board = new ChessBoard();
        this.board.initStandardBoard();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Player getPlayerWhite() {
        return playerWhite;
    }

    public void setPlayerWhite(Player playerWhite) {
        this.playerWhite = playerWhite;
    }

    public Player getPlayerBlack() {
        return playerBlack;
    }

    public void setPlayerBlack(Player playerBlack) {
        this.playerBlack = playerBlack;
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

    public int getTimeControlMinutes() {
        return timeControlMinutes;
    }

    public void setTimeControlMinutes(int timeControlMinutes) {
        this.timeControlMinutes = timeControlMinutes;
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

    public List<Move> getMoves() {
        return moves;
    }

    public void setMoves(List<Move> moves) {
        this.moves = moves;
    }

    public void addMove(Move move) {
        moves.add(move);
        move.setGame(this);
    }

    public ChessBoard getBoard() {
        return board;
    }

    public void setBoard(ChessBoard board) {
        this.board = board;
    }
}
