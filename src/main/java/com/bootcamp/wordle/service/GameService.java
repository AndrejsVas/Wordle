package com.bootcamp.wordle.service;
import com.bootcamp.wordle.model.Game;
import com.bootcamp.wordle.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;
    public Game createGame(int guessesAmount){
        Game game = new Game( guessesAmount);
        game.setWord("apple");
        return gameRepository.save(game);

    }
    public Game getGameById(int id){
        return gameRepository.findById(id);
    }

    public void setGuessesLeft(int gameId,int guessesLeft){
        Game game = gameRepository.findById(gameId);
        game.setGuessesLeft(guessesLeft);
        gameRepository.save(game);
    }


}
