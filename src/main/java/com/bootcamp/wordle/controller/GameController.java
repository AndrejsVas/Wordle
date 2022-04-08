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

        Game foundGame =  gameService.getGameById(guess.getId());
        int guessesLeft = foundGame.getGuessesLeft();
        boolean isWin = guess.getWord().equals(foundGame.getWord());
        boolean isWord = wordService.getWordByName(guess.getWord());
        int[] letterPlacement = new int[5];
        //GAME IS ALREADY FINISHED
        if(guessesLeft == 0){
            //TODO: JSON RESPONSE GAME DOES NOT EXIST (IS OVER)
            return new Answer(false,false,letterPlacement,guessesLeft-1);
        }
        //GAME IS EITHER WON OR NO MORE ATTEMPTS REMAIN AND LOSE
        if(isWin || (!isWin && (guessesLeft-1 == 0)) ){
            Answer answer = new Answer(isWord,isWin,letterPlacement,guessesLeft);
            gameService.finishGame(answer,foundGame);
            return answer;
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
