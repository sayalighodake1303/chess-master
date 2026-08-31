package com.chessmaster;

import com.chessmaster.model.*;
import com.chessmaster.model.piece.*;
import com.chessmaster.service.MoveService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class SpecialMovesTests {

    private ChessBoard board;
    private MoveService moveService;

    @BeforeEach
    public void setup() {
        board = new ChessBoard();
        moveService = new MoveService();
    }

    @Test
    public void testKingsideCastlingAllowed() {
        // Setup King at e1, Rook at h1, no pieces at f1, g1
        board.setPieceAt(7, 4, new King(Color.WHITE, new Position(7, 4), false));
        board.setPieceAt(7, 7, new Rook(Color.WHITE, new Position(7, 7), false));
        board.setPieceAt(0, 4, new King(Color.BLACK, new Position(0, 4), false));

        List<Position> kingMoves = moveService.getLegalMoves(board, Position.fromNotation("e1"));
        assertTrue(kingMoves.contains(Position.fromNotation("g1")), "White King should be able to castle kingside to g1");

        // Apply castling move
        moveService.applyMoveToBoard(board, Position.fromNotation("e1"), Position.fromNotation("g1"), PieceType.QUEEN);

        // Verify King at g1, Rook at f1
        assertNull(board.getPieceAt(7, 4));
        assertNull(board.getPieceAt(7, 7));
        assertEquals(PieceType.KING, board.getPieceAt(7, 6).getType());
        assertEquals(PieceType.ROOK, board.getPieceAt(7, 5).getType());
    }

    @Test
    public void testCastlingBlockedWhenInCheck() {
        // Setup White King at e1, Rook at h1, Black Rook attacking e1 from e8
        board.setPieceAt(7, 4, new King(Color.WHITE, new Position(7, 4), false));
        board.setPieceAt(7, 7, new Rook(Color.WHITE, new Position(7, 7), false));
        board.setPieceAt(0, 4, new King(Color.BLACK, new Position(0, 4), false));
        board.setPieceAt(0, 4, new Rook(Color.BLACK, new Position(0, 4), false)); // Black rook at e8 attacks e1

        assertTrue(board.isKingInCheck(Color.WHITE));
        List<Position> kingMoves = moveService.getLegalMoves(board, Position.fromNotation("e1"));
        assertFalse(kingMoves.contains(Position.fromNotation("g1")), "Cannot castle while in check");
    }

    @Test
    public void testEnPassantCapture() {
        // White Pawn at e5 (row 3, col 4), Black Pawn moves from d7 to d5 (row 1 to row 3, col 3)
        board.setPieceAt(3, 4, new Pawn(Color.WHITE, new Position(3, 4), true));
        board.setPieceAt(1, 3, new Pawn(Color.BLACK, new Position(1, 3), false));
        board.setPieceAt(7, 4, new King(Color.WHITE, new Position(7, 4), false));
        board.setPieceAt(0, 4, new King(Color.BLACK, new Position(0, 4), false));

        // Black moves d7 -> d5
        moveService.applyMoveToBoard(board, Position.fromNotation("d7"), Position.fromNotation("d5"), PieceType.QUEEN);

        // En passant target should be d6 (row 2, col 3)
        assertEquals(Position.fromNotation("d6"), board.getEnPassantTarget());

        // White e5 pawn should have legal move to d6
        List<Position> whitePawnMoves = moveService.getLegalMoves(board, Position.fromNotation("e5"));
        assertTrue(whitePawnMoves.contains(Position.fromNotation("d6")), "White pawn should be able to capture en passant at d6");

        // Execute en passant
        moveService.applyMoveToBoard(board, Position.fromNotation("e5"), Position.fromNotation("d6"), PieceType.QUEEN);

        // Black pawn at d5 should now be gone!
        assertNull(board.getPieceAt(Position.fromNotation("d5")), "Captured black pawn at d5 should be removed");
        assertEquals(PieceType.PAWN, board.getPieceAt(Position.fromNotation("d6")).getType());
    }

    @Test
    public void testPawnPromotion() {
        // White Pawn at a7 (row 1, col 0)
        board.setPieceAt(1, 0, new Pawn(Color.WHITE, new Position(1, 0), true));
        board.setPieceAt(7, 4, new King(Color.WHITE, new Position(7, 4), false));
        board.setPieceAt(0, 4, new King(Color.BLACK, new Position(0, 4), false));

        List<Position> moves = moveService.getLegalMoves(board, Position.fromNotation("a7"));
        assertTrue(moves.contains(Position.fromNotation("a8")));

        // Promote to Knight
        moveService.applyMoveToBoard(board, Position.fromNotation("a7"), Position.fromNotation("a8"), PieceType.KNIGHT);

        ChessPiece promoted = board.getPieceAt(Position.fromNotation("a8"));
        assertNotNull(promoted);
        assertEquals(PieceType.KNIGHT, promoted.getType(), "Promoted piece should be a Knight");
        assertEquals(Color.WHITE, promoted.getColor());
    }
}
