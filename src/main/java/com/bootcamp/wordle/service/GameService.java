package com.bootcamp.wordle.service;
import com.bootcamp.wordle.model.Game;
import com.bootcamp.wordle.repository.GameRepository;
import com.bootcamp.wordle.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {
    private static final long SESSION_EXPIRATION = 600000L;
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

    @Scheduled(fixedRate = 60000)
    public void checkSessionExpiration(){
        List<Game> allGames = gameRepository.findAll();
        for(Game currentGame : allGames){
            if(isGameExpired(currentGame)){
                gameRepository.delete(currentGame);
            }
        }
    }

    public boolean isGameExpired(Game currentGame){
        long lastActiveTime = currentGame.getLastActiveTime();
        long currentTime = System.currentTimeMillis();
        long timeElapsed = currentTime - lastActiveTime;
        return timeElapsed > SESSION_EXPIRATION;
    }

}
