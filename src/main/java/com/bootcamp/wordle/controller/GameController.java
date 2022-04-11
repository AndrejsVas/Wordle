package com.bootcamp.wordle.controller;

import com.bootcamp.wordle.model.Answer;
import com.bootcamp.wordle.model.Game;
import com.bootcamp.wordle.model.Guess;
import com.bootcamp.wordle.service.GameService;
import com.bootcamp.wordle.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Answer takeAGuess(@RequestBody Guess guess){
        Answer answerForGuess = gameService.makeAGuess(guess);
        return answerForGuess;


    }



}
