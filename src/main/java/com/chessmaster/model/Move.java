package com.chessmaster.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "moves")
public class Move {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    @JsonIgnore
    private Game game;

    @Column(name = "move_number", nullable = false)
    private int moveNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "player_color", nullable = false)
    private Color playerColor;

    @Column(name = "from_square", nullable = false, length = 5)
    private String fromSquare;

    @Column(name = "to_square", nullable = false, length = 5)
    private String toSquare;

    @Enumerated(EnumType.STRING)
    @Column(name = "piece_type", nullable = false)
    private PieceType pieceType;

    @Enumerated(EnumType.STRING)
    @Column(name = "captured_piece")
    private PieceType capturedPiece;

    @Column(name = "san", nullable = false, length = 20)
    private String san; // Standard Algebraic Notation e.g. "e4", "Nf3", "O-O", "Qxf7#"

    @Column(name = "is_check")
    private boolean isCheck = false;

    @Column(name = "is_checkmate")
    private boolean isCheckmate = false;

    @Column(name = "is_castling")
    private boolean isCastling = false;

    @Column(name = "is_en_passant")
    private boolean isEnPassant = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "promoted_piece")
    private PieceType promotedPiece;

    @Column(name = "played_at")
    private LocalDateTime playedAt = LocalDateTime.now();

    public Move() {
    }

    public Move(Game game, int moveNumber, Color playerColor, String fromSquare, String toSquare,
                PieceType pieceType, PieceType capturedPiece, String san,
                boolean isCheck, boolean isCheckmate, boolean isCastling, boolean isEnPassant, PieceType promotedPiece) {
        this.game = game;
        this.moveNumber = moveNumber;
        this.playerColor = playerColor;
        this.fromSquare = fromSquare;
        this.toSquare = toSquare;
        this.pieceType = pieceType;
        this.capturedPiece = capturedPiece;
        this.san = san;
        this.isCheck = isCheck;
        this.isCheckmate = isCheckmate;
        this.isCastling = isCastling;
        this.isEnPassant = isEnPassant;
        this.promotedPiece = promotedPiece;
        this.playedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public int getMoveNumber() {
        return moveNumber;
    }

    public void setMoveNumber(int moveNumber) {
        this.moveNumber = moveNumber;
    }

    public Color getPlayerColor() {
        return playerColor;
    }

    public void setPlayerColor(Color playerColor) {
        this.playerColor = playerColor;
    }

    public String getFromSquare() {
        return fromSquare;
    }

    public void setFromSquare(String fromSquare) {
        this.fromSquare = fromSquare;
    }

    public String getToSquare() {
        return toSquare;
    }

    public void setToSquare(String toSquare) {
        this.toSquare = toSquare;
    }

    public PieceType getPieceType() {
        return pieceType;
    }

    public void setPieceType(PieceType pieceType) {
        this.pieceType = pieceType;
    }

    public PieceType getCapturedPiece() {
        return capturedPiece;
    }

    public void setCapturedPiece(PieceType capturedPiece) {
        this.capturedPiece = capturedPiece;
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

    public boolean isCastling() {
        return isCastling;
    }

    public void setCastling(boolean castling) {
        isCastling = castling;
    }

    public boolean isEnPassant() {
        return isEnPassant;
    }

    public void setEnPassant(boolean enPassant) {
        isEnPassant = enPassant;
    }

    public PieceType getPromotedPiece() {
        return promotedPiece;
    }

    public void setPromotedPiece(PieceType promotedPiece) {
        this.promotedPiece = promotedPiece;
    }

    public LocalDateTime getPlayedAt() {
        return playedAt;
    }

    public void setPlayedAt(LocalDateTime playedAt) {
        this.playedAt = playedAt;
    }
}
