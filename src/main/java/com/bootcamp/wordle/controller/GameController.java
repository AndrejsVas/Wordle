package com.bootcamp.wordle.controller;

import com.bootcamp.wordle.model.Answer;
import com.bootcamp.wordle.model.Game;
import com.bootcamp.wordle.model.Guess;
import com.bootcamp.wordle.model.User;
import com.bootcamp.wordle.service.GameService;
import com.bootcamp.wordle.service.UserService;
import com.bootcamp.wordle.service.WordService;
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

    //createGameSession?userName=sampleName
    @PostMapping("/api/createGameSession")
    public int createGameSession(@RequestBody User user) {
        return gameService.createGame(user);

    }


    @PostMapping("/api/guess")
    public ResponseEntity<Answer> takeAGuess(@RequestBody Guess guess) {
        Answer answerForGuess = gameService.makeAGuess(guess);
        return new ResponseEntity<Answer>(answerForGuess,HttpStatus.OK);
    }

    @PostMapping("/api/pickAWord")
    public int pickAWord(@RequestBody Game game){
        return gameService.createGameFromPickedWord(game);


    }
    //We get gameId and userName
    @PostMapping("/api/challengeLink")
    public void challengeLink(@RequestBody Map<String, Object> payload){
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
