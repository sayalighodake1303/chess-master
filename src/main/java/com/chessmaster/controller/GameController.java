package com.chessmaster.controller;

import com.chessmaster.dto.*;
import com.chessmaster.service.ChessGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameController {

    private final ChessGameService chessGameService;

    @Autowired
    public GameController(ChessGameService chessGameService) {
        this.chessGameService = chessGameService;
    }

    @PostMapping
    public ResponseEntity<GameResponse> createGame(@RequestBody(required = false) CreateGameRequest request) {
        if (request == null) {
            request = new CreateGameRequest();
        }
        GameResponse gameResponse = chessGameService.createGame(request);
        return new ResponseEntity<>(gameResponse, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GameHistoryDTO>> getAllGames() {
        List<GameHistoryDTO> histories = chessGameService.getGameHistories();
        return ResponseEntity.ok(histories);
    }

    @GetMapping("/{gameId}")
    public ResponseEntity<GameResponse> getGame(@PathVariable Long gameId) {
        GameResponse gameResponse = chessGameService.getGame(gameId);
        return ResponseEntity.ok(gameResponse);
    }

    @PostMapping("/{gameId}/restart")
    public ResponseEntity<GameResponse> restartGame(@PathVariable Long gameId) {
        GameResponse gameResponse = chessGameService.restartGame(gameId);
        return ResponseEntity.ok(gameResponse);
    }

    @PostMapping("/{gameId}/undo")
    public ResponseEntity<GameResponse> undoMove(@PathVariable Long gameId) {
        GameResponse gameResponse = chessGameService.undoMove(gameId);
        return ResponseEntity.ok(gameResponse);
    }

    @PostMapping("/{gameId}/computer-move")
    public ResponseEntity<MoveResponse> makeComputerMove(@PathVariable Long gameId) {
        MoveResponse response = chessGameService.triggerComputerMove(gameId);
        return ResponseEntity.ok(response);
    }
}
