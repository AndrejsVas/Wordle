package com.bootcamp.wordle.controller;


import com.bootcamp.wordle.model.Game;
import com.bootcamp.wordle.model.MultiplayerGame;
import com.bootcamp.wordle.model.User;
import com.bootcamp.wordle.service.GameService;
import com.bootcamp.wordle.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
public class MultiplayerGameController {

    @Autowired
    private GameService gameService;
    @Autowired
    private UserService userService;

    @Operation(summary = "Create a game session using the provided word and return an integer with the multiplayer game id")
    @ApiResponse(responseCode = "200", description = "Game session is created" )
    @ApiResponse(responseCode = "404", description = "User provided word is not a valid word" )
    @PostMapping(value = "/api/multiplayerGame/pickAWord",consumes = "application/json")
    public int pickAWord(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Accepts the word picked by the user")
            @RequestBody MultiplayerGame multiplayerGame){
        return gameService.createMultiplayerGameFromPickedWord(multiplayerGame).getId();
    }

    @Operation(summary = "Called when the user clicks the challenge link. Assigns the user to the game. Returns game id")
    @ApiResponse(responseCode = "200", description = "Game session is created" )
    @PostMapping(value = "/api/multiplayerGame/challengeLink" ,consumes = "application/json")
    public int challengeLink(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Accepts the id of the game and the" +
                    "username of the person accepting the challenge")
            @RequestBody Map<String, Object> payload){
        String userName = String.valueOf(payload.get("userName"));
        int gameId = (int)payload.get("id");
        MultiplayerGame multiplayerGame = gameService.getMultiplayerGameById(gameId);
        //TODO: Improve username checks
        User user = userService.getUserByNameCreateIfNo(userName);
        Game game = gameService.createGame(user, multiplayerGame.getWordToGuess(), true);
        multiplayerGame = gameService.addGameToMultiplayerGame(multiplayerGame,game);
        //TODO: Better Response, prolly ResponseEntity
        return game.getId();

    }
    @Operation(summary = "Get statistics for a multiplayer game")
    @ApiResponse(responseCode = "200", description = "Game statistics fetched" )
    @GetMapping(value="/api/multiplayerGame/stats")
    public MultiplayerGame getMultiplayerStats(
            @Parameter(description = "The id of the requested multiplayer game")
            @RequestParam int multiplayerGameId ){
        MultiplayerGame multiplayerGame =  gameService.getMultiplayerGameById(multiplayerGameId);
        multiplayerGame.setGameList(null);
        return multiplayerGame;
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleNoSuchElementFoundException(
            NoSuchElementException exception
    ) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(exception.getMessage());
    }

}
