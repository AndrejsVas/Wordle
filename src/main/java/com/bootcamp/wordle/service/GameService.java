package com.bootcamp.wordle.service;
import com.bootcamp.wordle.model.Game;
import com.bootcamp.wordle.repository.GameRepository;
import com.bootcamp.wordle.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {
    private static final long SESSION_EXPIRATION = 200000L;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private WordService wordService;
    public Game createGame(int guessesAmount){
        Game game = new Game( guessesAmount);
        game.setLastActiveTime(System.currentTimeMillis());
        game.setWord(wordService.findRandomWord());
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


    public void checkSessionExpiration(){
        Game testGame = getGameById(1);
        long lastActiveTime = testGame.getLastActiveTime();
        long currentTime = System.currentTimeMillis();
        long timeElapsed = currentTime - lastActiveTime;
        if (timeElapsed > SESSION_EXPIRATION) ;
        gameRepository.delete(testGame);
    }

}
