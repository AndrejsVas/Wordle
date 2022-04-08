package com.bootcamp.wordle.service;

import com.bootcamp.wordle.model.Answer;
import com.bootcamp.wordle.model.Game;
import com.bootcamp.wordle.model.User;
import com.bootcamp.wordle.model.Word;
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
    @Autowired
    private UserService userService;

    public int createGame(String Username) {
        Game game = new Game();
        User user = userService.getUserByNameCreateIfNo(Username);
        game.setUserId(user);
        game.setGuessesLeft(6);
        game.setLastActiveTime(System.currentTimeMillis());
        game.setWord(wordService.findRandomWord());
        gameRepository.save(game);
        return game.getId();

    }

    public Game getGameById(int id) {
        return gameRepository.findById(id);
    }

    public void setGuessesLeft(int gameId, int guessesLeft) {
        try {
            if (guessesLeft < 0) {
                throw new ArithmeticException("Guesses can't be negative");
            }
            Game game = gameRepository.findById(gameId);
            game.setGuessesLeft(guessesLeft);
            gameRepository.save(game);
        } catch (NullPointerException e) {
            System.out.println("Guesses not set.");
        }
    }

    @Scheduled(fixedRate = 60000, initialDelay = 1000)
    public void checkSessionExpiration() {
        List<Game> allGames = new ArrayList<>();
        gameRepository.findAll().forEach(allGames::add);
        for (Game currentGame : allGames) {
            if (isGameExpired(currentGame)) {
                deleteGame(currentGame);
            }
        }
    }

    public boolean isGameExpired(Game currentGame) {
        long lastActiveTime = currentGame.getLastActiveTime();
        long currentTime = System.currentTimeMillis();
        long timeElapsed = currentTime - lastActiveTime;
        return timeElapsed > SESSION_EXPIRATION;
    }

    public void extendGameSessionLife(Game currentGame) {
        currentGame.setLastActiveTime(System.currentTimeMillis());
        gameRepository.save(currentGame);
    }

    //TODO Maybe some joins here
    //TODO: Potential refactoring
    public void finishGame(Answer answer, Game finishedGame) {
        User gamePlayer = finishedGame.getUser();
        gamePlayer.setTotalNumberOfGames(gamePlayer.getTotalNumberOfGames() + 1);
        int[] guessedWordsAtAttempt = gamePlayer.getGuessedWordsAtAttempt();
        if (answer.isWin()) {
            int newWinstreak = gamePlayer.getCurrentWinstreak() +1;
            gamePlayer.setCurrentWinstreak(newWinstreak);
            if(newWinstreak>gamePlayer.getLongestWinstreak())
                gamePlayer.setLongestWinstreak(newWinstreak);
            int wonAtGuessNumber = finishedGame.getGuessesLeft();
            //TODO:6 is hardcoded try Attempt
            guessedWordsAtAttempt[6-wonAtGuessNumber] = guessedWordsAtAttempt[6-wonAtGuessNumber] + 1;
            gamePlayer.setNumberOfWins(gamePlayer.getNumberOfWins()+1);
            gamePlayer.setGuessedWordsAtAttempt(guessedWordsAtAttempt);
        }
        if(!answer.isWin()){
            gamePlayer.setCurrentWinstreak(0);
        }
        int wins = gamePlayer.getNumberOfWins();
        int total = gamePlayer.getTotalNumberOfGames();
        int winrate = (wins*100/total);
        gamePlayer.setWinrate(winrate);
        userService.saveUser(gamePlayer);
        deleteGame(finishedGame);

    }

    public void deleteGame(Game gameToDelete){
        gameToDelete.setUser(null);
        gameRepository.delete(gameToDelete);

    }
}
