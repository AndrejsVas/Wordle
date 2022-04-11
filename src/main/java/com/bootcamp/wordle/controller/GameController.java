package com.bootcamp.wordle.controller;

import com.bootcamp.wordle.model.Answer;
import com.bootcamp.wordle.model.Game;
import com.bootcamp.wordle.model.Guess;
import com.bootcamp.wordle.service.GameService;
import com.bootcamp.wordle.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.NoSuchElementException;

@RestController
public class GameController {

    @Autowired
    private GameService gameService;
    @Autowired
    private WordService wordService;

    //createGameSession?userName=sampleName
    @GetMapping("/api/createGameSession")
    public int createGameSession(@RequestParam String userName) {
        return gameService.createGame(userName);
    }


    @PostMapping("/api/guess")
    public ResponseEntity<Answer> takeAGuess(@RequestBody Guess guess) {
        Answer answerForGuess = gameService.makeAGuess(guess);
        return new ResponseEntity<Answer>(answerForGuess,HttpStatus.OK);
    }

    @PostMapping("/api/pickAWord")
    public Game pickAWord(@RequestBody Game game){
        gameService.createGameFromPickedWord(game);
        return game;

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
