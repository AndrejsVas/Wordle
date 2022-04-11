package com.bootcamp.wordle.controller;

import com.bootcamp.wordle.model.Answer;
import com.bootcamp.wordle.model.Game;
import com.bootcamp.wordle.model.Guess;
import com.bootcamp.wordle.model.User;
import com.bootcamp.wordle.service.GameService;
import com.bootcamp.wordle.service.UserService;
import com.bootcamp.wordle.service.WordService;
import io.swagger.v3.oas.annotations.Operation;
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
    @PostMapping(value = "/api/ createGameSession", consumes = "application/json")
    public int createGameSession(

            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Accepts the userName from the body")
                                     @RequestBody User user) {
        return gameService.createGame(user);

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
            @RequestBody Game game){
        return gameService.createGameFromPickedWord(game);


    }
    //We get gameId and userName
    @Operation(summary = "Called when the user clicks the challenge link. Assigns the user to the game")
    @ApiResponse(responseCode = "200", description = "Game session is created" )
    @PostMapping(value = "/api/challengeLink" ,consumes = "application/json")
    public void challengeLink(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Accepts the id of the game and the" +
                    "username of the person accepting the challenge")
            @RequestBody Map<String, Object> payload){
        String userName = String.valueOf(payload.get("userName"));
        int gameId = (int)payload.get("id");
        Game game = gameService.getGameById(gameId);
        User user = userService.getUserByNameCreateIfNo(userName);
        game.setUser(user);
        gameService.saveGame(game);

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
