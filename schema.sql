-- Chess Master Database Schema (MySQL)

CREATE DATABASE IF NOT EXISTS chess_master_db;
USE chess_master_db;

-- Players Table
CREATE TABLE IF NOT EXISTS players (
    id BIGINT AUTO-INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    games_played INT DEFAULT 0,
    games_won INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Games Table
CREATE TABLE IF NOT EXISTS games (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    player_white_id BIGINT,
    player_black_id BIGINT,
    player_white_name VARCHAR(100) NOT NULL,
    player_black_name VARCHAR(100) NOT NULL,
    game_mode VARCHAR(30) NOT NULL, -- 'FRIEND', 'COMPUTER'
    difficulty VARCHAR(30),         -- 'EASY', 'MEDIUM', 'HARD', NULL
    user_color VARCHAR(10),         -- 'WHITE', 'BLACK'
    game_status VARCHAR(50) NOT NULL, -- 'IN_PROGRESS', 'WHITE_WON_CHECKMATE', 'BLACK_WON_CHECKMATE', 'DRAW_STALEMATE', etc.
    winner VARCHAR(50),
    time_control_minutes INT DEFAULT 10,
    remaining_white_seconds INT DEFAULT 600,
    remaining_black_seconds INT DEFAULT 600,
    fen VARCHAR(255),
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NULL,
    FOREIGN KEY (player_white_id) REFERENCES players(id) ON DELETE SET NULL,
    FOREIGN KEY (player_black_id) REFERENCES players(id) ON DELETE SET NULL
);

-- Moves Table
CREATE TABLE IF NOT EXISTS moves (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    game_id BIGINT NOT NULL,
    move_number INT NOT NULL,
    player_color VARCHAR(10) NOT NULL,
    from_square VARCHAR(5) NOT NULL,
    to_square VARCHAR(5) NOT NULL,
    piece_type VARCHAR(20) NOT NULL,
    captured_piece VARCHAR(20),
    san VARCHAR(20) NOT NULL, -- Standard Algebraic Notation e.g. "e4", "Nf3", "O-O"
    is_check BOOLEAN DEFAULT FALSE,
    is_checkmate BOOLEAN DEFAULT FALSE,
    is_castling BOOLEAN DEFAULT FALSE,
    is_en_passant BOOLEAN DEFAULT FALSE,
    promoted_piece VARCHAR(20),
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);
