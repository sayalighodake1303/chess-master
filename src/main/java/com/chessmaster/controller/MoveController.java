package com.chessmaster.controller;

import com.chessmaster.dto.LegalMovesResponse;
import com.chessmaster.dto.MoveRequest;
import com.chessmaster.dto.MoveResponse;
import com.chessmaster.model.Move;
import com.chessmaster.repository.MoveRepository;
import com.chessmaster.service.ChessGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games/{gameId}")
@CrossOrigin(origins = "*")
public class MoveController {

    private final ChessGameService chessGameService;
    private final MoveRepository moveRepository;

    @Autowired
    public MoveController(ChessGameService chessGameService, MoveRepository moveRepository) {
        this.chessGameService = chessGameService;
        this.moveRepository = moveRepository;
    }

    @PostMapping("/moves")
    public ResponseEntity<MoveResponse> makeMove(
            @PathVariable Long gameId,
            @RequestBody MoveRequest moveRequest) {
        MoveResponse response = chessGameService.makeMove(gameId, moveRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/legal-moves/{position}")
    public ResponseEntity<LegalMovesResponse> getLegalMoves(
            @PathVariable Long gameId,
            @PathVariable String position) {
        LegalMovesResponse response = chessGameService.getLegalMoves(gameId, position);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/moves")
    public ResponseEntity<List<Move>> getMoveHistory(@PathVariable Long gameId) {
        List<Move> moves = moveRepository.findByGameIdOrderByMoveNumberAsc(gameId);
        return ResponseEntity.ok(moves);
    }
}
