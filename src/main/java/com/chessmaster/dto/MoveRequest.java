package com.chessmaster.dto;

import com.chessmaster.model.PieceType;

public class MoveRequest {
    private String from; // e.g. "e2"
    private String to;   // e.g. "e4"
    private PieceType promotion = PieceType.QUEEN; // default promotion piece if pawn reaches 8th/1st rank

    public MoveRequest() {
    }

    public MoveRequest(String from, String to) {
        this.from = from;
        this.to = to;
        this.promotion = PieceType.QUEEN;
    }

    public MoveRequest(String from, String to, PieceType promotion) {
        this.from = from;
        this.to = to;
        this.promotion = promotion;
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

    public PieceType getPromotion() {
        return promotion;
    }

    public void setPromotion(PieceType promotion) {
        this.promotion = promotion;
    }
}
