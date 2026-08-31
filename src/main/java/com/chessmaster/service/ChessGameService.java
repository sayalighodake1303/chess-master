package com.chessmaster.service;

import com.chessmaster.dto.*;
import com.chessmaster.exception.GameNotFoundException;
import com.chessmaster.exception.InvalidMoveException;
import com.chessmaster.model.*;
import com.chessmaster.model.piece.*;
import com.chessmaster.repository.GameRepository;
import com.chessmaster.repository.MoveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ChessGameService {

    private final GameRepository gameRepository;
    private final MoveRepository moveRepository;
    private final MoveService moveService;
    private final AIService aiService;
    private final PlayerService playerService;

    // In-memory cache for active game boards for optimal performance
    private final Map<Long, ChessBoard> activeBoards = new ConcurrentHashMap<>();

    @Autowired
    public ChessGameService(GameRepository gameRepository,
                            MoveRepository moveRepository,
                            MoveService moveService,
                            AIService aiService,
                            PlayerService playerService) {
        this.gameRepository = gameRepository;
        this.moveRepository = moveRepository;
        this.moveService = moveService;
        this.aiService = aiService;
        this.playerService = playerService;
    }

    @Transactional
    public GameResponse createGame(CreateGameRequest request) {
        Game game = new Game();
        game.setGameMode(request.getGameMode() != null ? request.getGameMode() : GameMode.FRIEND);
        game.setDifficulty(request.getDifficulty() != null ? request.getDifficulty() : Difficulty.MEDIUM);
        game.setUserColor(request.getUserColor() != null ? request.getUserColor() : Color.WHITE);

        String whiteName = request.getPlayerWhiteName();
        String blackName = request.getPlayerBlackName();

        if (game.getGameMode() == GameMode.COMPUTER) {
            if (game.getUserColor() == Color.WHITE) {
                if (whiteName == null || whiteName.trim().isEmpty()) whiteName = "Player";
                blackName = "Computer (" + game.getDifficulty() + ")";
            } else {
                whiteName = "Computer (" + game.getDifficulty() + ")";
                if (blackName == null || blackName.trim().isEmpty()) blackName = "Player";
            }
        } else {
            if (whiteName == null || whiteName.trim().isEmpty()) whiteName = "Player 1";
            if (blackName == null || blackName.trim().isEmpty()) blackName = "Player 2";
        }

        game.setPlayerWhiteName(whiteName);
        game.setPlayerBlackName(blackName);

        Player p1 = playerService.getOrCreatePlayer(whiteName);
        Player p2 = playerService.getOrCreatePlayer(blackName);
        game.setPlayerWhite(p1);
        game.setPlayerBlack(p2);

        int timeMinutes = request.getTimeControlMinutes() > 0 ? request.getTimeControlMinutes() : 10;
        game.setTimeControlMinutes(timeMinutes);
        game.setRemainingWhiteSeconds(timeMinutes * 60);
        game.setRemainingBlackSeconds(timeMinutes * 60);

        ChessBoard board = new ChessBoard();
        board.initStandardBoard();
        game.setBoard(board);
        game.setFen(board.toFEN(Color.WHITE));
        game.setCurrentTurn(Color.WHITE);
        game.setGameStatus(GameStatus.IN_PROGRESS);

        Game savedGame = gameRepository.save(game);
        activeBoards.put(savedGame.getId(), board);

        return buildGameResponse(savedGame, board);
    }

    public GameResponse getGame(Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new GameNotFoundException("Game not found with ID: " + gameId));
        ChessBoard board = getOrRebuildBoard(game);
        return buildGameResponse(game, board);
    }

    public LegalMovesResponse getLegalMoves(Long gameId, String positionStr) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new GameNotFoundException("Game not found with ID: " + gameId));

        if (game.getGameStatus().isGameOver()) {
            return new LegalMovesResponse(positionStr, Collections.emptyList(), null, null);
        }

        Position pos = Position.fromNotation(positionStr);
        ChessBoard board = getOrRebuildBoard(game);
        ChessPiece piece = board.getPieceAt(pos);

        if (piece == null || piece.getColor() != game.getCurrentTurn()) {
            return new LegalMovesResponse(positionStr, Collections.emptyList(),
                    piece != null ? piece.getType().name() : null,
                    piece != null ? piece.getColor().name() : null);
        }

        List<Position> legalTargets = moveService.getLegalMoves(board, pos);
        List<String> targetNotations = legalTargets.stream().map(Position::toNotation).toList();

        return new LegalMovesResponse(positionStr, targetNotations, piece.getType().name(), piece.getColor().name());
    }

    @Transactional
    public MoveResponse makeMove(Long gameId, MoveRequest request) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new GameNotFoundException("Game not found with ID: " + gameId));

        if (game.getGameStatus().isGameOver()) {
            throw new InvalidMoveException("This game has already ended: " + game.getGameStatus());
        }

        Position from = Position.fromNotation(request.getFrom());
        Position to = Position.fromNotation(request.getTo());
        ChessBoard board = getOrRebuildBoard(game);

        ChessPiece movingPiece = board.getPieceAt(from);
        if (movingPiece == null) {
            throw new InvalidMoveException("No piece found at " + request.getFrom());
        }

        if (movingPiece.getColor() != game.getCurrentTurn()) {
            throw new InvalidMoveException("It is not " + movingPiece.getColor() + "'s turn");
        }

        List<Position> legalMoves = moveService.getLegalMoves(board, from);
        if (!legalMoves.contains(to)) {
            throw new InvalidMoveException("Illegal move: " + request.getFrom() + " -> " + request.getTo());
        }

        // Determine move properties
        ChessPiece targetPiece = board.getPieceAt(to);
        boolean isCastling = (movingPiece instanceof King && Math.abs(to.getCol() - from.getCol()) == 2);
        boolean isEnPassant = (movingPiece instanceof Pawn && board.getEnPassantTarget() != null && to.equals(board.getEnPassantTarget()));
        PieceType capturedType = null;
        if (targetPiece != null) {
            capturedType = targetPiece.getType();
        } else if (isEnPassant) {
            capturedType = PieceType.PAWN;
        }

        PieceType promotionPiece = request.getPromotion() != null ? request.getPromotion() : PieceType.QUEEN;

        // Apply move
        ChessBoard beforeBoard = board.copy();
        moveService.applyMoveToBoard(board, from, to, promotionPiece);

        Color nextTurn = game.getCurrentTurn().opposite();
        boolean isCheck = board.isKingInCheck(nextTurn);
        boolean isCheckmate = moveService.isCheckmate(board, nextTurn);
        boolean isStalemate = moveService.isStalemate(board, nextTurn);
        boolean isDrawMaterial = board.hasInsufficientMaterial();

        // Format SAN
        String san = moveService.formatSAN(beforeBoard, from, to, movingPiece, targetPiece,
                isCastling, isEnPassant, promotionPiece, isCheck, isCheckmate);

        // Update Game status
        if (isCheckmate) {
            if (game.getCurrentTurn() == Color.WHITE) {
                game.setGameStatus(GameStatus.WHITE_WON_CHECKMATE);
                game.setWinner(game.getPlayerWhiteName());
                playerService.recordGameFinished(game.getPlayerWhiteName(), true);
                playerService.recordGameFinished(game.getPlayerBlackName(), false);
            } else {
                game.setGameStatus(GameStatus.BLACK_WON_CHECKMATE);
                game.setWinner(game.getPlayerBlackName());
                playerService.recordGameFinished(game.getPlayerBlackName(), true);
                playerService.recordGameFinished(game.getPlayerWhiteName(), false);
            }
            game.setEndTime(LocalDateTime.now());
        } else if (isStalemate) {
            game.setGameStatus(GameStatus.DRAW_STALEMATE);
            game.setWinner("Draw by Stalemate");
            game.setEndTime(LocalDateTime.now());
        } else if (isDrawMaterial) {
            game.setGameStatus(GameStatus.DRAW_INSUFFICIENT_MATERIAL);
            game.setWinner("Draw by Insufficient Material");
            game.setEndTime(LocalDateTime.now());
        } else {
            game.setCurrentTurn(nextTurn);
        }

        game.setFen(board.toFEN(game.getCurrentTurn()));

        // Save move entity
        List<Move> existingMoves = moveRepository.findByGameIdOrderByMoveNumberAsc(gameId);
        int moveNum = existingMoves.size() + 1;
        Move move = new Move(game, moveNum, movingPiece.getColor(),
                from.toNotation(), to.toNotation(), movingPiece.getType(),
                capturedType, san, isCheck, isCheckmate, isCastling, isEnPassant,
                (movingPiece instanceof Pawn && (to.getRow() == 0 || to.getRow() == 7)) ? promotionPiece : null);
        moveRepository.save(move);
        gameRepository.save(game);

        activeBoards.put(gameId, board);

        GameResponse response = buildGameResponse(game, board);
        response.setLastMoveFrom(from.toNotation());
        response.setLastMoveTo(to.toNotation());

        MoveResponse moveResponse = new MoveResponse(true, "Move successful", response);
        moveResponse.setSan(san);
        moveResponse.setCheck(isCheck);
        moveResponse.setCheckmate(isCheckmate);
        moveResponse.setDraw(isStalemate || isDrawMaterial);
        moveResponse.setFrom(from.toNotation());
        moveResponse.setTo(to.toNotation());
        moveResponse.setCapturedPiece(capturedType);

        return moveResponse;
    }

    @Transactional
    public MoveResponse triggerComputerMove(Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new GameNotFoundException("Game not found with ID: " + gameId));

        if (game.getGameMode() != GameMode.COMPUTER) {
            throw new InvalidMoveException("Game mode is not vs Computer");
        }

        if (game.getGameStatus().isGameOver()) {
            throw new InvalidMoveException("Game has already ended");
        }

        Color computerColor = (game.getUserColor() == Color.WHITE) ? Color.BLACK : Color.WHITE;
        if (game.getCurrentTurn() != computerColor) {
            throw new InvalidMoveException("It is not the computer's turn");
        }

        ChessBoard board = getOrRebuildBoard(game);
        MoveService.MoveOption selectedMove = aiService.selectMove(board, computerColor, game.getDifficulty());

        if (selectedMove == null) {
            throw new InvalidMoveException("Computer has no legal moves");
        }

        MoveRequest req = new MoveRequest(selectedMove.getFrom().toNotation(), selectedMove.getTo().toNotation(), PieceType.QUEEN);
        return makeMove(gameId, req);
    }

    @Transactional
    public GameResponse undoMove(Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new GameNotFoundException("Game not found with ID: " + gameId));

        List<Move> moves = moveRepository.findByGameIdOrderByMoveNumberAsc(gameId);
        if (moves.isEmpty()) {
            return buildGameResponse(game, getOrRebuildBoard(game));
        }

        int movesToUndo = (game.getGameMode() == GameMode.COMPUTER && moves.size() >= 2) ? 2 : 1;

        for (int i = 0; i < movesToUndo; i++) {
            if (!moves.isEmpty()) {
                Move last = moves.remove(moves.size() - 1);
                moveRepository.delete(last);
            }
        }

        // Rebuild board from start
        ChessBoard newBoard = new ChessBoard();
        newBoard.initStandardBoard();

        Color turn = Color.WHITE;
        for (Move m : moves) {
            Position f = Position.fromNotation(m.getFromSquare());
            Position t = Position.fromNotation(m.getToSquare());
            moveService.applyMoveToBoard(newBoard, f, t, m.getPromotedPiece() != null ? m.getPromotedPiece() : PieceType.QUEEN);
            turn = turn.opposite();
        }

        game.setCurrentTurn(turn);
        game.setGameStatus(GameStatus.IN_PROGRESS);
        game.setWinner(null);
        game.setEndTime(null);
        game.setFen(newBoard.toFEN(turn));

        gameRepository.save(game);
        activeBoards.put(gameId, newBoard);

        return buildGameResponse(game, newBoard);
    }

    @Transactional
    public GameResponse restartGame(Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new GameNotFoundException("Game not found with ID: " + gameId));

        List<Move> moves = moveRepository.findByGameIdOrderByMoveNumberAsc(gameId);
        moveRepository.deleteAll(moves);

        ChessBoard board = new ChessBoard();
        board.initStandardBoard();

        game.setCurrentTurn(Color.WHITE);
        game.setGameStatus(GameStatus.IN_PROGRESS);
        game.setWinner(null);
        game.setRemainingWhiteSeconds(game.getTimeControlMinutes() * 60);
        game.setRemainingBlackSeconds(game.getTimeControlMinutes() * 60);
        game.setStartTime(LocalDateTime.now());
        game.setEndTime(null);
        game.setFen(board.toFEN(Color.WHITE));

        gameRepository.save(game);
        activeBoards.put(gameId, board);

        return buildGameResponse(game, board);
    }

    public List<GameHistoryDTO> getGameHistories() {
        List<Game> games = gameRepository.findAllByOrderByStartTimeDesc();
        List<GameHistoryDTO> dtos = new ArrayList<>();

        for (Game g : games) {
            List<Move> moves = moveRepository.findByGameIdOrderByMoveNumberAsc(g.getId());
            dtos.add(new GameHistoryDTO(
                    g.getId(),
                    g.getPlayerWhiteName(),
                    g.getPlayerBlackName(),
                    g.getGameMode(),
                    g.getDifficulty(),
                    g.getGameStatus(),
                    g.getWinner(),
                    moves.size(),
                    g.getStartTime(),
                    g.getEndTime()
            ));
        }

        return dtos;
    }

    private ChessBoard getOrRebuildBoard(Game game) {
        ChessBoard board = activeBoards.get(game.getId());
        if (board == null) {
            board = new ChessBoard();
            board.initStandardBoard();
            List<Move> moves = moveRepository.findByGameIdOrderByMoveNumberAsc(game.getId());
            for (Move m : moves) {
                Position f = Position.fromNotation(m.getFromSquare());
                Position t = Position.fromNotation(m.getToSquare());
                moveService.applyMoveToBoard(board, f, t, m.getPromotedPiece() != null ? m.getPromotedPiece() : PieceType.QUEEN);
            }
            activeBoards.put(game.getId(), board);
        }
        return board;
    }

    private GameResponse buildGameResponse(Game game, ChessBoard board) {
        GameResponse resp = new GameResponse();
        resp.setId(game.getId());
        resp.setPlayerWhiteName(game.getPlayerWhiteName());
        resp.setPlayerBlackName(game.getPlayerBlackName());
        resp.setGameMode(game.getGameMode());
        resp.setDifficulty(game.getDifficulty());
        resp.setUserColor(game.getUserColor());
        resp.setCurrentTurn(game.getCurrentTurn());
        resp.setGameStatus(game.getGameStatus());
        resp.setWinner(game.getWinner());
        resp.setRemainingWhiteSeconds(game.getRemainingWhiteSeconds());
        resp.setRemainingBlackSeconds(game.getRemainingBlackSeconds());
        resp.setFen(board.toFEN(game.getCurrentTurn()));

        boolean isCheck = board.isKingInCheck(game.getCurrentTurn());
        resp.setCheck(isCheck);
        if (isCheck) {
            Position kingPos = board.getKingPosition(game.getCurrentTurn());
            if (kingPos != null) {
                resp.setCheckSquare(kingPos.toNotation());
            }
        }

        // Active pieces
        List<PieceDTO> pieceDTOs = new ArrayList<>();
        for (int r = 0; r < 8; r++) {
            for (int c = 0; c < 8; c++) {
                ChessPiece p = board.getPieceAt(r, c);
                if (p != null) {
                    pieceDTOs.add(new PieceDTO(p.getType(), p.getColor(), p.getPosition().toNotation(), r, c, p.isHasMoved()));
                }
            }
        }
        resp.setPieces(pieceDTOs);

        // Captured pieces & Move history
        List<Move> moves = moveRepository.findByGameIdOrderByMoveNumberAsc(game.getId());
        List<String> sans = new ArrayList<>();
        List<PieceDTO> captured = new ArrayList<>();

        for (Move m : moves) {
            sans.add(m.getSan());
            if (m.getCapturedPiece() != null) {
                Color capturedColor = m.getPlayerColor().opposite();
                captured.add(new PieceDTO(m.getCapturedPiece(), capturedColor, null, -1, -1, true));
            }
        }
        resp.setMoveHistory(sans);
        resp.setCapturedPieces(captured);

        if (!moves.isEmpty()) {
            Move lastMove = moves.get(moves.size() - 1);
            resp.setLastMoveFrom(lastMove.getFromSquare());
            resp.setLastMoveTo(lastMove.getToSquare());
        }

        return resp;
    }
}
