package com.bootcamp.wordle.controller;

import com.bootcamp.wordle.model.*;
import com.bootcamp.wordle.service.GameService;
import com.bootcamp.wordle.service.UserService;
import com.bootcamp.wordle.service.WordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
public class GameController {

    @Autowired
    private GameService gameService;
    @Autowired
    private WordService wordService;
    @Autowired
    private UserService userService;


    @Operation(summary = "Create a game session using a userName and return an integer with the game id")
    @ApiResponse(responseCode = "200", description = "Game session is created" )
    @PostMapping(value = "/api/createGameSession", consumes = "application/json")
    public int createGameSession(

            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Accepts the userName from the body")
                                     @RequestBody User user) {
        Game createdGame =  gameService.createGame(user);
        return createdGame.getId();
    }

    @Operation(summary = "Submit an attempt to guess the word")
    @ApiResponse(responseCode = "200", description = "Game session is created" )
    @ApiResponse(responseCode = "404", description = "Game not found")
    @PostMapping(value = "/api/guess", produces = "application/json",consumes = "application/json")
    public ResponseEntity<Answer> takeAGuess(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Accepts the id of the game and the " +
                    "attempted guess of a word")
            @RequestBody Guess guess) {
        Answer answerForGuess = gameService.makeAGuess(guess);
        return new ResponseEntity<Answer>(answerForGuess,HttpStatus.OK);
    }

    @Operation(summary = "Create a game session using the provided word and return an integer with the game id")
    @ApiResponse(responseCode = "200", description = "Game session is created" )
    @PostMapping(value = "/api/pickAWord",consumes = "application/json")
    public int pickAWord(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Accepts the word picked by the user")
            @RequestBody MultiplayerGame multiplayerGame){
        return gameService.createMultiplayerGameFromPickedWord(multiplayerGame).getId();



    }

    @Operation(summary = "Called when the user clicks the challenge link. Assigns the user to the game. Returns game id")
    @ApiResponse(responseCode = "200", description = "Game session is created" )
    @PostMapping(value = "/api/challengeLink" ,consumes = "application/json")
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
        //TODO : Check if game already exists
        multiplayerGame.getGameList().put(game.getUser().getUserId(),game);
        multiplayerGame.setNumOfPlayersPlayed(multiplayerGame.getNumOfPlayersPlayed()+1);
        gameService.saveGame(game);
        gameService.saveGame(multiplayerGame);
        return gameId;

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
