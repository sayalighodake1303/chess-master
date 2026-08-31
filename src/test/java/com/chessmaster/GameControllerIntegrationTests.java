package com.chessmaster;

import com.chessmaster.dto.CreateGameRequest;
import com.chessmaster.dto.MoveRequest;
import com.chessmaster.model.GameMode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class GameControllerIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateGameAndGetLegalMovesAndMakeMove() throws Exception {
        // 1. Create a new Game
        CreateGameRequest createReq = new CreateGameRequest();
        createReq.setPlayerWhiteName("Sayali");
        createReq.setPlayerBlackName("Rahul");
        createReq.setGameMode(GameMode.FRIEND);

        MvcResult createResult = mockMvc.perform(post("/api/games")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.playerWhiteName", is("Sayali")))
                .andExpect(jsonPath("$.playerBlackName", is("Rahul")))
                .andExpect(jsonPath("$.currentTurn", is("WHITE")))
                .andReturn();

        String responseJson = createResult.getResponse().getContentAsString();
        Long gameId = objectMapper.readTree(responseJson).get("id").asLong();

        // 2. Test Legal Moves API for Knight at g1 (Expect f3 and h3)
        mockMvc.perform(get("/api/games/" + gameId + "/legal-moves/g1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.position", is("g1")))
                .andExpect(jsonPath("$.pieceType", is("KNIGHT")))
                .andExpect(jsonPath("$.legalMoves", containsInAnyOrder("f3", "h3")));

        // 3. Test Legal Moves API for Pawn at e2 (Expect e3 and e4)
        mockMvc.perform(get("/api/games/" + gameId + "/legal-moves/e2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.position", is("e2")))
                .andExpect(jsonPath("$.pieceType", is("PAWN")))
                .andExpect(jsonPath("$.legalMoves", containsInAnyOrder("e3", "e4")));

        // 4. Make a valid move: e2 -> e4
        MoveRequest moveReq = new MoveRequest("e2", "e4");
        mockMvc.perform(post("/api/games/" + gameId + "/moves")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(moveReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.san", is("e4")))
                .andExpect(jsonPath("$.gameState.currentTurn", is("BLACK")));

        // 5. Try making an illegal move (e.g. White tries to move again or illegal square)
        MoveRequest illegalMove = new MoveRequest("e4", "e5"); // Black's turn now
        mockMvc.perform(post("/api/games/" + gameId + "/moves")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(illegalMove)))
                .andExpect(status().isBadRequest());
    }
}
