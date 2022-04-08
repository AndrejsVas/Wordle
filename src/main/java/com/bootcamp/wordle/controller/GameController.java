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

    @GetMapping("/api/createUser")

    @PostMapping("/api/guess")
    public Answer takeAGuess(@RequestBody Guess guess){

        Game foundGame =  gameService.getGameById(guess.getId());
        boolean isWin = guess.getWord().equals(foundGame.getWord());
        boolean isWord = wordService.getWordByName(guess.getWord());
        int guessesLeft = foundGame.getGuessesLeft();
        int[] letterPlacement = new int[5];
        if(guessesLeft == 0)
            return new Answer(isWord,isWin,letterPlacement,guessesLeft);
        //hardcoded size
        if(isWin){
            return new Answer(isWord,isWin,letterPlacement,guessesLeft);
        }
        else if( !isWord){
            gameService.extendGameSessionLife(foundGame);
            return new Answer(isWord,isWin,letterPlacement,guessesLeft);
        }
        gameService.extendGameSessionLife(foundGame);
        gameService.setGuessesLeft(foundGame.getId(),guessesLeft-1);
        letterPlacement = wordService.compareWords(guess.getWord(),foundGame.getWord());
        return new Answer(isWord,isWin,letterPlacement,foundGame.getGuessesLeft());


    }



}
