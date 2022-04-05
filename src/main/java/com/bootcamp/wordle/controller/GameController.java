package com.bootcamp.wordle.controller;

import com.bootcamp.wordle.model.Answer;
import com.bootcamp.wordle.model.Game;
import com.bootcamp.wordle.model.Guess;
import com.bootcamp.wordle.service.GameService;
import com.bootcamp.wordle.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

    @Autowired
    private GameService gameService;
    @Autowired
    private WordService wordService;

    @GetMapping("/api/createGameSession")
    public int createGameSession() {
        return gameService.createGame().getId();
    }

    @PostMapping("/api/guess")
    public Answer takeAGuess(@RequestBody Guess guess){
        boolean isWord = wordService.getWordByName(guess.getWord());
        Game foundGame =  gameService.getGameById(guess.getId());
        int[] letterPlacement = wordService.compareWords(guess.getWord(),foundGame.getWord());
        return new Answer();

    }

}
