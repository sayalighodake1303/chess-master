package com.chessmaster;

import com.chessmaster.model.*;
import com.chessmaster.model.piece.*;
import com.chessmaster.service.MoveService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ChessEngineTests {

    private ChessBoard board;
    private MoveService moveService;

    @BeforeEach
    public void setup() {
        board = new ChessBoard();
        board.initStandardBoard();
        moveService = new MoveService();
    }

    @Test
    public void testInitialBoardSetup() {
        assertEquals(PieceType.ROOK, board.getPieceAt(0, 0).getType());
        assertEquals(Color.BLACK, board.getPieceAt(0, 0).getColor());

        assertEquals(PieceType.KING, board.getPieceAt(7, 4).getType());
        assertEquals(Color.WHITE, board.getPieceAt(7, 4).getColor());

        assertEquals(PieceType.KING, board.getPieceAt(0, 4).getType());
        assertEquals(Color.BLACK, board.getPieceAt(0, 4).getColor());

        // White pawns at row 6
        for (int c = 0; c < 8; c++) {
            assertEquals(PieceType.PAWN, board.getPieceAt(6, c).getType());
            assertEquals(Color.WHITE, board.getPieceAt(6, c).getColor());
        }
    }

    @Test
    public void testPawnInitialMoves() {
        Position e2 = Position.fromNotation("e2");
        List<Position> legalMoves = moveService.getLegalMoves(board, e2);

        // e2 pawn can move to e3 or e4
        assertEquals(2, legalMoves.size());
        assertTrue(legalMoves.contains(Position.fromNotation("e3")));
        assertTrue(legalMoves.contains(Position.fromNotation("e4")));
    }

    @Test
    public void testKnightInitialMoves() {
        // g1 Knight has 2 legal starting moves: f3 and h3
        Position g1 = Position.fromNotation("g1");
        List<Position> legalMoves = moveService.getLegalMoves(board, g1);

        assertEquals(2, legalMoves.size());
        assertTrue(legalMoves.contains(Position.fromNotation("f3")));
        assertTrue(legalMoves.contains(Position.fromNotation("h3")));

        // b1 Knight has 2 legal starting moves: a3 and c3
        Position b1 = Position.fromNotation("b1");
        List<Position> b1Moves = moveService.getLegalMoves(board, b1);
        assertEquals(2, b1Moves.size());
        assertTrue(b1Moves.contains(Position.fromNotation("a3")));
        assertTrue(b1Moves.contains(Position.fromNotation("c3")));
    }

    @Test
    public void testBishopBlockedInitially() {
        // c1 Bishop is blocked by pawns at b2, c2, d2
        Position c1 = Position.fromNotation("c1");
        List<Position> legalMoves = moveService.getLegalMoves(board, c1);
        assertTrue(legalMoves.isEmpty());
    }

    @Test
    public void testRookMovement() {
        ChessBoard customBoard = new ChessBoard();
        customBoard.setPieceAt(4, 4, new Rook(Color.WHITE, new Position(4, 4))); // e4
        customBoard.setPieceAt(7, 4, new King(Color.WHITE, new Position(7, 4)));
        customBoard.setPieceAt(0, 4, new King(Color.BLACK, new Position(0, 4)));

        List<Position> moves = moveService.getLegalMoves(customBoard, new Position(4, 4));
        // 7 horizontal + 7 vertical = 14 moves (minus own king square if on path)
        assertTrue(moves.contains(Position.fromNotation("e5")));
        assertTrue(moves.contains(Position.fromNotation("e6")));
        assertTrue(moves.contains(Position.fromNotation("e7")));
        assertTrue(moves.contains(Position.fromNotation("e8"))); // King can be captured
        assertTrue(moves.contains(Position.fromNotation("a4")));
        assertTrue(moves.contains(Position.fromNotation("h4")));
    }

    @Test
    public void testCheckmateDetectionFoolsMate() {
        // 1. f3 e5 2. g4 Qh4# (Fool's Mate)
        moveService.applyMoveToBoard(board, Position.fromNotation("f2"), Position.fromNotation("f3"), PieceType.QUEEN);
        moveService.applyMoveToBoard(board, Position.fromNotation("e7"), Position.fromNotation("e5"), PieceType.QUEEN);
        moveService.applyMoveToBoard(board, Position.fromNotation("g2"), Position.fromNotation("g4"), PieceType.QUEEN);
        moveService.applyMoveToBoard(board, Position.fromNotation("d8"), Position.fromNotation("h4"), PieceType.QUEEN);

        assertTrue(board.isKingInCheck(Color.WHITE), "White king should be in check");
        assertTrue(moveService.isCheckmate(board, Color.WHITE), "White should be checkmated");
    }
}
