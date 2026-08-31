package com.chessmaster.controller;

import com.chessmaster.model.Player;
import com.chessmaster.repository.PlayerRepository;
import com.chessmaster.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "*")
public class PlayerController {

    private final PlayerService playerService;
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerController(PlayerService playerService, PlayerRepository playerRepository) {
        this.playerService = playerService;
        this.playerRepository = playerRepository;
    }

    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        return ResponseEntity.ok(playerRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Player> getOrCreatePlayer(@RequestParam String username) {
        Player player = playerService.getOrCreatePlayer(username);
        return ResponseEntity.ok(player);
    }
}
