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
        Game game = gameService.createGame(6);
        return game.getId();
    }

    @PostMapping("/api/guess")
    public Answer takeAGuess(@RequestBody Guess guess){

        Game foundGame =  gameService.getGameById(guess.getId());
        boolean isWin = guess.getWord().equals(foundGame.getWord());
        boolean isWord = wordService.getWordByName(guess.getWord());
        int guessesLeft = foundGame.getGuessesLeft();
        //hardcoded size
        int[] letterPlacement = new int[5];
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
