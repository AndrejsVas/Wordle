package com.bootcamp.wordle.controller;

import com.bootcamp.wordle.model.*;
import com.bootcamp.wordle.service.GameService;
import com.bootcamp.wordle.service.UserService;
import com.bootcamp.wordle.service.WordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
        gameService.saveGame(createdGame);
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



}
