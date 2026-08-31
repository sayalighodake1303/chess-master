# ♟️ Chess Master – Interactive Java Chess Game

> **Play Chess. Think Smart. Win the Game.**

Chess Master is a web-based chess game built using **Java, Spring Boot, HTML, CSS, and JavaScript**.

The application allows users to play chess in two ways:

 👥 **Play with a Friend** – Two players can play on the same device.
 🤖 **Play with Computer** – Play against an AI opponent with different difficulty levels.

The Java backend manages the chess rules, legal moves, game state, AI moves, and database operations.

---

📌 Table of Contents

1.Project Overview
2.Features
3.Game Modes
4.Computer AI
5.Chess Rules Supported
6.Technologies Used
7.System Architecture
8.Project Structure
9.Database
10.Installation
11.MySQL Configuration
12.Running the Project
13.REST API
14.How Legal Moves Work
15.Testing
16.Future Improvements
---

# 🎯 Project Overview

**Chess Master** is a full-stack web application that provides an interactive chess-playing experience.

The project uses:

* **Java + Spring Boot** for the backend
* **HTML5 + CSS3 + JavaScript** for the frontend
* **MySQL / H2** for storing game information
* **Minimax + Alpha-Beta Pruning** for the harder AI levels

The backend is responsible for making sure that only **legal chess moves** are allowed.

It also handles:

* Chess board management
* Player turns
* Legal move calculation
* Check and checkmate
* Special chess moves
* Computer AI
* Move history
* Undo and restart
* Game history
* Database storage

---

# ✨ Features

## ♟️ Chess Gameplay

* Complete 8×8 chess board
* All standard chess pieces
* Legal move validation
* Turn-based gameplay
* Capture support
* Move history
* Chess clocks

## 🟢 Legal Move Highlighting

When a player selects a chess piece, the application calculates its legal moves.

* Empty valid squares are highlighted with **green circles**
* Squares containing an opponent piece are highlighted with **green rings**

This helps players easily understand where a selected piece can move.

---

# 🎮 Game Modes

## 👥 Play with Friend

Two players can play on the same computer.

The mode supports:

* Player names
* White/Black side selection
* Automatic turn switching
* Chess clocks
* Move history
* Undo
* Restart game

---

## 🤖 Play with Computer

Players can choose to play against the computer.

The player can select:

* White or Black
* AI difficulty level

There are **three AI difficulty levels**:

| Level     | Description                                       |
| --------- | ------------------------------------------------- |
| 🟢 Easy   | Simple legal moves with a preference for captures |
| 🟡 Medium | Uses 2-ply Minimax                                |
| 🔴 Hard   | Uses Minimax with Alpha-Beta Pruning              |

---

# 🤖 Computer AI

The computer opponent has three difficulty levels.

## 🟢 Easy

The Easy AI chooses a legal move.

It also has a **35% preference for capture moves**, making it slightly more intelligent than completely random play.

---

## 🟡 Medium

The Medium AI uses a **2-ply Minimax algorithm**.

It evaluates:

* Piece values
* Piece positions
* Possible moves

This allows the computer to look ahead before making a move.

---

## 🔴 Hard

The Hard AI uses:

* Minimax
* Alpha-Beta Pruning
* Piece-Square Tables
* Move ordering
* Center control
* Piece mobility
* King safety

The search depth is approximately **3–4 plies**.

### Piece Values

| Piece  |  Value |
| ------ | -----: |
| Pawn   |    100 |
| Knight |    320 |
| Bishop |    330 |
| Rook   |    500 |
| Queen  |    900 |
| King   | 20,000 |

The AI evaluates these values to decide which position is better.

---

# ♜ Chess Rules Supported

Chess Master supports the important standard chess rules.

### Special Moves

* ✅ Kingside Castling `O-O`
* ✅ Queenside Castling `O-O-O`
* ✅ En Passant
* ✅ Pawn Promotion
* ✅ Promotion to Queen
* ✅ Promotion to Rook
* ✅ Promotion to Bishop
* ✅ Promotion to Knight

### Game Conditions

* ✅ Check detection
* ✅ Checkmate detection
* ✅ Stalemate detection
* ✅ Insufficient-material draw
* ✅ Pinned piece validation
* ✅ Legal check-escape validation

When the king is in check, the interface displays:

> ⚠️ CHECK!

and visually highlights the king's square.

---

# 📝 Move History

The application stores moves using **Standard Algebraic Notation (SAN)**.

Examples include:

```text
e4
Nf3
Bxf7+
O-O
Qxf7#
```

Move history can be viewed during and after a game.

---

# 🎮 Game Controls

The application provides several controls:

* ↩️ **Undo** – Undo previous moves
* 🔄 **Restart** – Start the current game again
* 🏠 **Main Menu** – Return to the main menu
* 📜 **Game History** – View previous games

In Computer mode, Undo handles the player's move together with the corresponding AI move.

---

# 🔊 Sound Effects

Chess Master includes sound effects using the **Web Audio API**.

Sounds are provided for:

* Normal moves
* Captures
* Check
* Checkmate
* Invalid actions

The sounds are generated directly in the browser.

---

# 🎨 Board Themes

Users can choose from multiple board themes:

* 🪵 Classic Wood
* 🟢 Dark Emerald
* 🔵 Ocean Blue
* ⚫ Tournament Charcoal
* 💠 Cyber Glass

---

# 📱 Responsive Design

The frontend is designed to work on different screen sizes.

It supports:

* 💻 Desktop
* 🖥️ Laptop
* 📱 Mobile
* 📱 Tablet

The layout automatically adapts to the screen size.

---

# 🛠️ Technologies Used

## Backend

| Technology            | Purpose                           |
| --------------------- | --------------------------------- |
| **Java 17 / 21**      | Main programming language         |
| **Spring Boot 3.2.x** | Backend framework                 |
| **Spring Web**        | REST APIs                         |
| **Spring Data JPA**   | Database operations               |
| **Spring Validation** | Request validation                |
| **Maven**             | Project and dependency management |
| **Hibernate**         | ORM                               |
| **JUnit 5**           | Unit testing                      |
| **MockMvc**           | API testing                       |

---

## Frontend

| Technology          | Purpose                    |
| ------------------- | -------------------------- |
| **HTML5**           | Page structure             |
| **CSS3**            | Styling and animations     |
| **JavaScript ES6+** | Game interaction           |
| **Fetch API**       | Communication with backend |
| **Web Audio API**   | Sound effects              |

No heavy frontend framework is used.

---

## Database

The application supports:

* **H2 Database** – Default in-memory database
* **MySQL** – Persistent database

---

# 🏗️ System Architecture

The project follows a layered architecture.

```text
                    ┌─────────────────────────┐
                    │        Browser          │
                    │   HTML / CSS / JS       │
                    │                         │
                    │ • Chess Board           │
                    │ • Legal Move Highlight  │
                    │ • Clock                  │
                    │ • Move History           │
                    └────────────┬────────────┘
                                 │
                                 │ REST API / JSON
                                 ▼
                    ┌─────────────────────────┐
                    │   Spring Boot Backend   │
                    │      Controllers        │
                    └────────────┬────────────┘
                                 │
                ┌────────────────┴────────────────┐
                ▼                                 ▼
      ┌────────────────────┐          ┌────────────────────┐
      │ ChessGameService    │          │    AIService       │
      │                     │          │                    │
      │ • Game state        │          │ • Easy AI          │
      │ • Turn management   │          │ • Medium AI        │
      │ • Clock             │          │ • Hard AI          │
      │ • Undo              │          │ • Minimax           │
      │ • Restart           │          │ • Alpha-Beta        │
      └──────────┬─────────┘          └──────────┬─────────┘
                 │                               │
                 └──────────────┬────────────────┘
                                ▼
                    ┌─────────────────────────┐
                    │     MoveService         │
                    │                         │
                    │ • Legal moves           │
                    │ • Check detection       │
                    │ • Checkmate             │
                    │ • SAN notation          │
                    └────────────┬────────────┘
                                 ▼
                    ┌─────────────────────────┐
                    │    Chess Domain Model   │
                    │                         │
                    │ • ChessBoard            │
                    │ • Pawn                   │
                    │ • Knight                 │
                    │ • Bishop                 │
                    │ • Rook                   │
                    │ • Queen                  │
                    │ • King                   │
                    └────────────┬────────────┘
                                 ▼
                    ┌─────────────────────────┐
                    │     Database            │
                    │    MySQL / H2           │
                    └─────────────────────────┘
```

---

# 📂 Project Structure

```text
chess-master/
│
├── pom.xml
├── README.md
├── schema.sql
│
└── src/
    │
    ├── main/
    │   │
    │   ├── java/com/chessmaster/
    │   │   │
    │   │   ├── ChessMasterApplication.java
    │   │   │
    │   │   ├── controller/
    │   │   │   ├── GameController.java
    │   │   │   ├── MoveController.java
    │   │   │   └── PlayerController.java
    │   │   │
    │   │   ├── dto/
    │   │   │   ├── CreateGameRequest.java
    │   │   │   ├── MoveRequest.java
    │   │   │   ├── MoveResponse.java
    │   │   │   ├── GameResponse.java
    │   │   │   ├── LegalMovesResponse.java
    │   │   │   ├── PieceDTO.java
    │   │   │   └── GameHistoryDTO.java
    │   │   │
    │   │   ├── exception/
    │   │   │   ├── GlobalExceptionHandler.java
    │   │   │   ├── InvalidMoveException.java
    │   │   │   └── GameNotFoundException.java
    │   │   │
    │   │   ├── model/
    │   │   │   ├── Color.java
    │   │   │   ├── Difficulty.java
    │   │   │   ├── GameMode.java
    │   │   │   ├── GameStatus.java
    │   │   │   ├── PieceType.java
    │   │   │   ├── Position.java
    │   │   │   ├── ChessBoard.java
    │   │   │   ├── Game.java
    │   │   │   ├── Player.java
    │   │   │   ├── Move.java
    │   │   │   │
    │   │   │   └── piece/
    │   │   │       ├── ChessPiece.java
    │   │   │       ├── Pawn.java
    │   │   │       ├── Knight.java
    │   │   │       ├── Bishop.java
    │   │   │       ├── Rook.java
    │   │   │       ├── Queen.java
    │   │   │       └── King.java
    │   │   │
    │   │   ├── repository/
    │   │   │   ├── GameRepository.java
    │   │   │   ├── PlayerRepository.java
    │   │   │   └── MoveRepository.java
    │   │   │
    │   │   └── service/
    │   │       ├── AIService.java
    │   │       ├── ChessGameService.java
    │   │       ├── MoveService.java
    │   │       └── PlayerService.java
    │   │
    │   └── resources/
    │       ├── application.properties
    │       │
    │       └── static/
    │           ├── index.html
    │           │
    │           ├── css/
    │           │   └── style.css
    │           │
    │           └── js/
    │               ├── api.js
    │               ├── sound.js
    │               ├── chessboard.js
    │               ├── game.js
    │               ├── ui.js
    │               └── app.js
    │
    └── test/
        └── java/com/chessmaster/
            ├── ChessEngineTests.java
            ├── LegalMoveCalculationTests.java
            ├── SpecialMovesTests.java
            └── GameControllerIntegrationTests.java
```

---

# 🗄️ Database

The project can use an **H2 in-memory database by default**.

For permanent data storage, the project can be configured with **MySQL**.

The main database tables are:

## `players`

Stores player information.

```text
id
username
games_played
games_won
created_at
```

---

## `games`

Stores information about each chess game.

```text
id
player_white_name
player_black_name
game_mode
difficulty
user_color
game_status
winner
time_control_minutes
remaining_white_seconds
remaining_black_seconds
fen
start_time
end_time
```

---

## `moves`

Stores the moves played during a game.

```text
id
game_id
move_number
player_color
from_square
to_square
piece_type
captured_piece
san
is_check
is_checkmate
is_castling
is_en_passant
promoted_piece
played_at
```

---

# ☕ Installation

Before running the project, install:

* **Java 17 or higher**
* **Apache Maven**
* **MySQL** if you want to use MySQL instead of H2

### Check Java

Open Command Prompt or PowerShell:

```bash
java -version
```

### Check Maven

```bash
mvn -version
```

Make sure both commands work correctly.

---

# 🗄️ MySQL Configuration

MySQL configuration is optional because the application can use H2 by default.

If you want to use MySQL, create the database first.

### Step 1 – Create Database

Open MySQL Workbench or MySQL Command Line and run:

```sql
CREATE DATABASE chess_master_db;
```

### Step 2 – Configure Application

Open:

```text
src/main/resources/application.properties
```

Configure the MySQL connection:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/chess_master_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.datasource.username=root

spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

You can also use the provided `schema.sql` file if required.

---

# ▶️ Running the Project

Open a terminal in the project root directory:

```text
chess-master/
```

### Step 1 – Build the Project

Run:

```bash
mvn clean install
```

### Step 2 – Start Spring Boot

Run:

```bash
mvn spring-boot:run
```

Wait until Spring Boot starts successfully.

---

# 🌐 Open the Application

Once the server starts, open your browser and visit:

```text
http://localhost:8080
```

The Chess Master application should now appear.

---

# 🗃️ H2 Database Console

If you are using the default H2 database, the H2 console is available at:

```text
http://localhost:8080/h2-console
```

The configured JDBC URL is:

```text
jdbc:h2:mem:chessdb
```

---

# 🔌 REST API

The frontend communicates with the Spring Boot backend using REST APIs.

Method   	        Endpoint	                         Purpose
          
POST    	       /api/games	                       Create a new game
GET	            /api/games	                       Get game history
GET	           /api/games/{id}	                 Get current game state
POST            /api/games/{id}/moves	           Submit a chess move    
GET            /api/games/{id}/legal-moves/{pos}     Get legal moves for a piece
POST          /api/games/{id}/computer-move	     Ask the AI to make a move
POST         /api/games/{id}/undo	                 Undo previous move(s)
POST	      /api/games/{id}/restart	                 Restart the game
GET	     /api/games/{id}/moves	                 Get the game's move history
---

# 🧠 How Legal Move Calculation Works

The backend follows three main steps.

### Step 1 – Generate Possible Moves

Each chess piece generates its possible moves according to its movement rules.

For example:

* Pawn → moves forward and captures diagonally
* Knight → moves in an L-shape
* Bishop → moves diagonally
* Rook → moves horizontally and vertically
* Queen → combines Bishop and Rook movement
* King → moves one square in any direction

---

### Step 2 – Check Whether the King Is Safe

For every possible move, the backend temporarily simulates the move on a copied board.

```text
Original Board
      ↓
Simulate Move
      ↓
Check King's Safety
      ↓
Is King in Check?
   ↙          ↘
 YES           NO
  ↓             ↓
Reject       Accept Move
```

If the move leaves the player's king in check, that move is rejected.

This prevents illegal moves by pinned pieces and ensures that the king cannot be left in check.

---

### Step 3 – Send Legal Moves to Frontend

The backend sends the valid destination squares to the frontend.

The frontend then highlights those squares in green.

---

# 🤖 How the AI Works

The AI follows different strategies depending on the selected difficulty.

```text
                Computer AI
                    │
          ┌─────────┼─────────┐
          │         │         │
        Easy      Medium     Hard
          │         │         │
      Legal       2-ply     3/4-ply
       Moves      Minimax    Minimax
          │         │         │
       Capture   Position   Alpha-Beta
       Bias      + Material  Pruning
```

The Hard AI also uses:

* Piece-Square Tables
* Center control
* Piece mobility
* King safety
* Capture-first move ordering

---

# 🧪 Testing

The project includes automated tests.

Run all tests using:

```bash
mvn test
```

The tests cover:

### Piece Movement

* Pawn single move
* Pawn double move
* Knight movement
* Bishop movement
* Rook movement
* Queen movement
* King movement

### Special Moves

* En Passant
* Castling
* Pawn Promotion

### Chess Rules

* Check detection
* Checkmate
* Pinned pieces
* Legal check escapes
* Scholar's Mate
* Fool's Mate
* Insufficient material
* Stalemate

### API Testing

The project also uses **MockMvc** to test REST API endpoints.

For example:

```text
GET /api/games/{id}/legal-moves/g1
```

The test verifies that the correct legal moves are returned.

---

# 📚 Main Backend Components

## Controller

Controllers receive requests from the frontend and send responses back.

Examples:

```text
GameController
MoveController
PlayerController
```

---

## Service

Services contain the main application logic.

```text
ChessGameService
MoveService
AIService
PlayerService
```

For example:

* `ChessGameService` → manages games
* `MoveService` → calculates legal moves
* `AIService` → calculates computer moves
* `PlayerService` → manages players

---

## Model

The model represents the chess game objects.

Examples:

```text
ChessBoard
Game
Player
Move
Position
ChessPiece
Pawn
Knight
Bishop
Rook
Queen
King
```

The chess pieces follow an object-oriented design.

---

## Repository

Repositories communicate with the database.

```text
GameRepository
PlayerRepository
MoveRepository
```

Spring Data JPA is used for database operations.

---

# 🔄 Game Flow

A typical game works like this:

```text
Start Application
       ↓
    Main Menu
       ↓
 ┌─────┴──────┐
 ↓            ↓
Friend      Computer
 ↓            ↓
Players     AI Level
 ↓            ↓
 └─────┬──────┘
       ↓
   Chess Board
       ↓
 Select Piece
       ↓
Calculate Legal Moves
       ↓
Highlight Valid Squares
       ↓
 Make Move
       ↓
Update Game State
       ↓
Check Game Status
       ↓
Continue / Checkmate / Draw
```

---

# 🏆 Game History

The application stores completed game information.

Players can view:

* Player names
* Game date
* Number of moves
* Game result
* Game mode
* Other stored game information

This makes it possible to inspect previous matches.

---

# 💡 Object-Oriented Design

The chess engine is designed using Object-Oriented Programming.

The base class is:

```text
ChessPiece
```

Different chess pieces extend this model:

```text
             ChessPiece
                  │
       ┌──────────┼──────────┐
       │          │          │
     Pawn      Knight      Bishop
       │          │          │
      Rook      Queen       King
```

Each piece has its own movement behavior.

This makes the chess engine easier to maintain and extend.

---

# 🔐 Error Handling

The project includes centralized exception handling.

Important exceptions include:

```text
InvalidMoveException
GameNotFoundException
```

`GlobalExceptionHandler` is used to handle errors consistently.

---

# 📈 Future Improvements

Possible future improvements include:

* 🌐 Online multiplayer
* 👤 User authentication and profiles
* 🏆 Leaderboard
* 📊 Player statistics
* 💾 Save and resume games
* 🎥 Game replay
* ⏱️ More time-control options
* 🤖 Stronger AI
* 📱 Improved mobile interface
* 🌍 Multiple language support

---

# 👩‍💻 Project Summary

**Chess Master** combines:

* Java
* Object-Oriented Programming
* Spring Boot
* REST APIs
* HTML/CSS/JavaScript
* Artificial Intelligence
* Minimax Algorithm
* Alpha-Beta Pruning
* MySQL/H2
* JPA/Hibernate
* Automated Testing

The project demonstrates how a traditional chess game can be converted into a **full-stack web application** with a Java-based chess engine and an interactive frontend.

---

## ⭐ Project Highlights

| Feature               | Supported |
| --------------------- | --------- |
| Play with Friend      | ✅         |
| Play with Computer    | ✅         |
| Easy AI               | ✅         |
| Medium AI             | ✅         |
| Hard AI               | ✅         |
| Legal Move Validation | ✅         |
| Check Detection       | ✅         |
| Checkmate Detection   | ✅         |
| Castling              | ✅         |
| En Passant            | ✅         |
| Pawn Promotion        | ✅         |
| Move History          | ✅         |
| Undo                  | ✅         |
| Restart               | ✅         |
| Game History          | ✅         |
| Chess Clocks          | ✅         |
| Sound Effects         | ✅         |
| Multiple Themes       | ✅         |
| Responsive UI         | ✅         |
| MySQL                 | ✅         |
| H2                    | ✅         |
| Automated Tests       | ✅         |

---

# 📌 Quick Start

If Java and Maven are already installed:

```bash
git clone <your-repository-url>
cd chess-master

mvn clean install
mvn spring-boot:run
```

Then open:

```text
http://localhost:8080
```

🎉 **Start playing Chess Master!**

---


