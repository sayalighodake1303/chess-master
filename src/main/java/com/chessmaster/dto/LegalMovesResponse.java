package com.chessmaster.dto;

import java.util.List;

public class LegalMovesResponse {
    private String position; // e.g. "g1"
    private List<String> legalMoves; // e.g. ["e2", "f3", "h3"]
    private String pieceType;
    private String color;

    public LegalMovesResponse() {
    }

    public LegalMovesResponse(String position, List<String> legalMoves, String pieceType, String color) {
        this.position = position;
        this.legalMoves = legalMoves;
        this.pieceType = pieceType;
        this.color = color;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public List<String> getLegalMoves() {
        return legalMoves;
    }

    public void setLegalMoves(List<String> legalMoves) {
        this.legalMoves = legalMoves;
    }

    public String getPieceType() {
        return pieceType;
    }

    public void setPieceType(String pieceType) {
        this.pieceType = pieceType;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
