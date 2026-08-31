package com.chessmaster;

import com.chessmaster.model.*;
import com.chessmaster.model.piece.*;
import com.chessmaster.service.MoveService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class LegalMoveCalculationTests {

    private ChessBoard board;
    private MoveService moveService;

    @BeforeEach
    public void setup() {
        board = new ChessBoard();
        moveService = new MoveService();
    }

    @Test
    public void testPinnedPieceCannotMoveOffPinLine() {
        // White King at e1 (7, 4), White Bishop at e4 (4, 4), Black Queen at e8 (0, 4)
        board.setPieceAt(7, 4, new King(Color.WHITE, new Position(7, 4), true));
        board.setPieceAt(4, 4, new Bishop(Color.WHITE, new Position(4, 4), true));
        board.setPieceAt(0, 4, new Queen(Color.BLACK, new Position(0, 4), true));
        board.setPieceAt(0, 0, new King(Color.BLACK, new Position(0, 0), true));

        // The White Bishop can only move diagonally, but moving diagonally would expose the White King to the Black Queen
        // Therefore, the Bishop has 0 legal moves!
        List<Position> bishopMoves = moveService.getLegalMoves(board, Position.fromNotation("e4"));
        assertTrue(bishopMoves.isEmpty(), "Pinned Bishop should have 0 legal moves");
    }

    @Test
    public void testKingCannotMoveIntoCheck() {
        // White King at e1 (7, 4), Black Rook at d8 (0, 3) controlling d-file
        board.setPieceAt(7, 4, new King(Color.WHITE, new Position(7, 4), true));
        board.setPieceAt(0, 3, new Rook(Color.BLACK, new Position(0, 3), true));
        board.setPieceAt(0, 0, new King(Color.BLACK, new Position(0, 0), true));

        List<Position> kingMoves = moveService.getLegalMoves(board, Position.fromNotation("e1"));
        // d1 and d2 are attacked by the Black Rook, so King cannot move to d1 or d2
        assertFalse(kingMoves.contains(Position.fromNotation("d1")));
        assertFalse(kingMoves.contains(Position.fromNotation("d2")));
        assertTrue(kingMoves.contains(Position.fromNotation("f1")));
        assertTrue(kingMoves.contains(Position.fromNotation("e2")));
    }
}
