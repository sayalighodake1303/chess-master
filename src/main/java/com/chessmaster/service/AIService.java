package com.chessmaster.service;

import com.chessmaster.model.*;
import com.chessmaster.model.piece.ChessPiece;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AIService {

    private final MoveService moveService;
    private final Random random = new Random();

    // Piece-Square Tables (from White's perspective; indexed by [row][col])
    private static final int[][] PAWN_PST = {
            { 0,  0,  0,  0,  0,  0,  0,  0},
            {50, 50, 50, 50, 50, 50, 50, 50},
            {10, 10, 20, 30, 30, 20, 10, 10},
            { 5,  5, 10, 25, 25, 10,  5,  5},
            { 0,  0,  0, 20, 20,  0,  0,  0},
            { 5, -5,-10,  0,  0,-10, -5,  5},
            { 5, 10, 10,-20,-20, 10, 10,  5},
            { 0,  0,  0,  0,  0,  0,  0,  0}
    };

    private static final int[][] KNIGHT_PST = {
            {-50,-40,-30,-30,-30,-30,-40,-50},
            {-40,-20,  0,  0,  0,  0,-20,-40},
            {-30,  0, 10, 15, 15, 10,  0,-30},
            {-30,  5, 15, 20, 20, 15,  5,-30},
            {-30,  0, 15, 20, 20, 15,  0,-30},
            {-30,  5, 10, 15, 15, 10,  5,-30},
            {-40,-20,  0,  5,  5,  0,-20,-40},
            {-50,-40,-30,-30,-30,-30,-40,-50}
    };

    private static final int[][] BISHOP_PST = {
            {-20,-10,-10,-10,-10,-10,-10,-20},
            {-10,  0,  0,  0,  0,  0,  0,-10},
            {-10,  0,  5, 10, 10,  5,  0,-10},
            {-10,  5,  5, 10, 10,  5,  5,-10},
            {-10,  0, 10, 10, 10, 10,  0,-10},
            {-10, 10, 10, 10, 10, 10, 10,-10},
            {-10,  5,  0,  0,  0,  0,  5,-10},
            {-20,-10,-10,-10,-10,-10,-10,-20}
    };

    private static final int[][] ROOK_PST = {
            { 0,  0,  0,  0,  0,  0,  0,  0},
            { 5, 10, 10, 10, 10, 10, 10,  5},
            {-5,  0,  0,  0,  0,  0,  0, -5},
            {-5,  0,  0,  0,  0,  0,  0, -5},
            {-5,  0,  0,  0,  0,  0,  0, -5},
            {-5,  0,  0,  0,  0,  0,  0, -5},
            {-5,  0,  0,  0,  0,  0,  0, -5},
            { 0,  0,  0,  5,  5,  0,  0,  0}
    };

    private static final int[][] QUEEN_PST = {
            {-20,-10,-10, -5, -5,-10,-10,-20},
            {-10,  0,  0,  0,  0,  0,  0,-10},
            {-10,  0,  5,  5,  5,  5,  0,-10},
            { -5,  0,  5,  5,  5,  5,  0, -5},
            {  0,  0,  5,  5,  5,  5,  0, -5},
            {-10,  5,  5,  5,  5,  5,  0,-10},
            {-10,  0,  5,  0,  0,  0,  0,-10},
            {-20,-10,-10, -5, -5,-10,-10,-20}
    };

    private static final int[][] KING_MIDDLE_PST = {
            {-30,-40,-40,-50,-50,-40,-40,-30},
            {-30,-40,-40,-50,-50,-40,-40,-30},
            {-30,-40,-40,-50,-50,-40,-40,-30},
            {-30,-40,-40,-50,-50,-40,-40,-30},
            {-20,-30,-30,-40,-40,-30,-30,-20},
            {-10,-20,-20,-20,-20,-20,-20,-10},
            { 20, 20,  0,  0,  0,  0, 20, 20},
            { 20, 30, 10,  0,  0, 10, 30, 20}
    };

    @Autowired
    public AIService(MoveService moveService) {
        this.moveService = moveService;
    }

    public MoveService.MoveOption selectMove(ChessBoard board, Color aiColor, Difficulty difficulty) {
        List<MoveService.MoveOption> legalMoves = moveService.getAllLegalMoves(board, aiColor);
        if (legalMoves.isEmpty()) {
            return null;
        }

        if (difficulty == null) difficulty = Difficulty.MEDIUM;

        return switch (difficulty) {
            case EASY -> selectEasyMove(board, legalMoves);
            case MEDIUM -> selectMediumMove(board, legalMoves, aiColor);
            case HARD -> selectHardMove(board, legalMoves, aiColor);
        };
    }

    /**
     * Easy: Selects a legal move randomly, but gives 30% preference to capturing an opponent piece.
     */
    private MoveService.MoveOption selectEasyMove(ChessBoard board, List<MoveService.MoveOption> legalMoves) {
        List<MoveService.MoveOption> captureMoves = new ArrayList<>();
        for (MoveService.MoveOption m : legalMoves) {
            if (board.getPieceAt(m.getTo()) != null) {
                captureMoves.add(m);
            }
        }

        if (!captureMoves.isEmpty() && random.nextDouble() < 0.35) {
            return captureMoves.get(random.nextInt(captureMoves.size()));
        }

        return legalMoves.get(random.nextInt(legalMoves.size()));
    }

    /**
     * Medium: 2-ply Minimax evaluation with basic material and piece-square table weights.
     */
    private MoveService.MoveOption selectMediumMove(ChessBoard board, List<MoveService.MoveOption> legalMoves, Color aiColor) {
        MoveService.MoveOption bestMove = legalMoves.get(0);
        int bestScore = Integer.MIN_VALUE;

        // Shuffle moves to avoid repetitive play
        Collections.shuffle(legalMoves, random);

        for (MoveService.MoveOption move : legalMoves) {
            ChessBoard simBoard = board.copy();
            moveService.applyMoveToBoard(simBoard, move.getFrom(), move.getTo(), PieceType.QUEEN);

            // Minimax depth 2
            int score = minimax(simBoard, 1, false, Integer.MIN_VALUE, Integer.MAX_VALUE, aiColor);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }

        return bestMove;
    }

    /**
     * Hard: 3-ply Minimax with Alpha-Beta pruning and comprehensive board evaluation.
     */
    private MoveService.MoveOption selectHardMove(ChessBoard board, List<MoveService.MoveOption> legalMoves, Color aiColor) {
        MoveService.MoveOption bestMove = legalMoves.get(0);
        int bestScore = Integer.MIN_VALUE;
        int alpha = Integer.MIN_VALUE;
        int beta = Integer.MAX_VALUE;

        // Order moves for better alpha-beta pruning (captures first)
        legalMoves.sort((m1, m2) -> {
            int score1 = getMoveOrderingScore(board, m1);
            int score2 = getMoveOrderingScore(board, m2);
            return Integer.compare(score2, score1);
        });

        for (MoveService.MoveOption move : legalMoves) {
            ChessBoard simBoard = board.copy();
            moveService.applyMoveToBoard(simBoard, move.getFrom(), move.getTo(), PieceType.QUEEN);

            // Minimax depth 3 with Alpha-Beta
            int score = minimax(simBoard, 2, false, alpha, beta, aiColor);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) {
                break;
            }
        }

        return bestMove;
    }

    private int getMoveOrderingScore(ChessBoard board, MoveService.MoveOption move) {
        int score = 0;
        ChessPiece target = board.getPieceAt(move.getTo());
        if (target != null) {
            ChessPiece attacker = board.getPieceAt(move.getFrom());
            int victimValue = target.getType().getValue();
            int attackerValue = (attacker != null) ? attacker.getType().getValue() : 0;
            score += 1000 + (victimValue - attackerValue / 10);
        }
        return score;
    }

    private int minimax(ChessBoard board, int depth, boolean isMaximizing, int alpha, int beta, Color aiColor) {
        Color currentColor = isMaximizing ? aiColor : aiColor.opposite();

        if (depth == 0) {
            return evaluateBoard(board, aiColor);
        }

        List<MoveService.MoveOption> legalMoves = moveService.getAllLegalMoves(board, currentColor);

        if (legalMoves.isEmpty()) {
            if (board.isKingInCheck(currentColor)) {
                // Checkmate: severe penalty or huge win depending on who is mated
                return isMaximizing ? -200000 + (3 - depth) * 1000 : 200000 - (3 - depth) * 1000;
            } else {
                // Stalemate
                return 0;
            }
        }

        if (isMaximizing) {
            int maxEval = Integer.MIN_VALUE;
            for (MoveService.MoveOption move : legalMoves) {
                ChessBoard sim = board.copy();
                moveService.applyMoveToBoard(sim, move.getFrom(), move.getTo(), PieceType.QUEEN);
                int eval = minimax(sim, depth - 1, false, alpha, beta, aiColor);
                maxEval = Math.max(maxEval, eval);
                alpha = Math.max(alpha, eval);
                if (beta <= alpha) {
                    break;
                }
            }
            return maxEval;
        } else {
            int minEval = Integer.MAX_VALUE;
            for (MoveService.MoveOption move : legalMoves) {
                ChessBoard sim = board.copy();
                moveService.applyMoveToBoard(sim, move.getFrom(), move.getTo(), PieceType.QUEEN);
                int eval = minimax(sim, depth - 1, true, alpha, beta, aiColor);
                minEval = Math.min(minEval, eval);
                beta = Math.min(beta, eval);
                if (beta <= alpha) {
                    break;
                }
            }
            return minEval;
        }
    }

    /**
     * Comprehensive board evaluation function from AI's perspective.
     */
    public int evaluateBoard(ChessBoard board, Color aiColor) {
        int whiteScore = 0;
        int blackScore = 0;

        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 8; c++) {
                ChessPiece piece = board.getPieceAt(r, c);
                if (piece != null) {
                    int pieceVal = piece.getType().getValue();
                    int pstVal = getPSTValue(piece, r, c);
                    int totalPieceScore = pieceVal + pstVal;

                    if (piece.getColor() == Color.WHITE) {
                        whiteScore += totalPieceScore;
                    } else {
                        blackScore += totalPieceScore;
                    }
                }
            }
        }

        // Center control bonus (d4, d5, e4, e5)
        int[][] centerSquares = {{3, 3}, {3, 4}, {4, 3}, {4, 4}};
        for (int[] sq : centerSquares) {
            ChessPiece cp = board.getPieceAt(sq[0], sq[1]);
            if (cp != null) {
                if (cp.getColor() == Color.WHITE) whiteScore += 15;
                else blackScore += 15;
            }
        }

        // Mobility bonus
        int whiteMobility = moveService.getAllLegalMoves(board, Color.WHITE).size();
        int blackMobility = moveService.getAllLegalMoves(board, Color.BLACK).size();
        whiteScore += whiteMobility * 2;
        blackScore += blackMobility * 2;

        int netScore = whiteScore - blackScore;
        return (aiColor == Color.WHITE) ? netScore : -netScore;
    }

    private int getPSTValue(ChessPiece piece, int row, int col) {
        int r = (piece.getColor() == Color.WHITE) ? row : (7 - row);
        int c = col;

        return switch (piece.getType()) {
            case PAWN -> PAWN_PST[r][c];
            case KNIGHT -> KNIGHT_PST[r][c];
            case BISHOP -> BISHOP_PST[r][c];
            case ROOK -> ROOK_PST[r][c];
            case QUEEN -> QUEEN_PST[r][c];
            case KING -> KING_MIDDLE_PST[r][c];
        };
    }
}
