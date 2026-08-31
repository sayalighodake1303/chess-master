package com.chessmaster.service;

import com.chessmaster.model.Player;
import com.chessmaster.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Transactional
    public Player getOrCreatePlayer(String username) {
        if (username == null || username.trim().isEmpty()) {
            username = "Player";
        }
        String cleanUsername = username.trim();
        return playerRepository.findByUsername(cleanUsername)
                .orElseGet(() -> playerRepository.save(new Player(cleanUsername)));
    }

    @Transactional
    public void recordGameFinished(String username, boolean isWinner) {
        if (username == null || username.trim().isEmpty() || username.equalsIgnoreCase("Computer")) {
            return;
        }
        playerRepository.findByUsername(username.trim()).ifPresent(player -> {
            player.setGamesPlayed(player.getGamesPlayed() + 1);
            if (isWinner) {
                player.setGamesWon(player.getGamesWon() + 1);
            }
            playerRepository.save(player);
        });
    }
}
