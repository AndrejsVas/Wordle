package com.bootcamp.wordle.service;

import com.bootcamp.wordle.model.*;
import com.bootcamp.wordle.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class GameService {
    private static final long SESSION_EXPIRATION = 600000L;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private WordService wordService;
    @Autowired
    private UserService userService;

    public int createGame(User user) {

        User returnedUser = userService.getUserByNameCreateIfNo(user.getUserName());
        Game game = new Game();
        game.setUser(returnedUser);
        game.setWord(wordService.findRandomWord());
        gameRepository.save(game);
        return game.getId();

    }
    public int createGameFromPickedWord(Game game){

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
    public Answer makeAGuess(Guess userGuess){
        Game foundGame =  getGameById(userGuess.getId());
        if(foundGame == null)
            throw new NoSuchElementException("Game not found");
        int guessesLeft = foundGame.getGuessesLeft();
        boolean isWin = userGuess.getWord().equals(foundGame.getWord());
        boolean isWord = wordService.getWordByName(userGuess.getWord());
        int[] letterPlacement = new int[5];
        //GAME IS ALREADY FINISHED
        if(guessesLeft == 0){
            //TODO: JSON RESPONSE GAME DOES NOT EXIST (IS OVER)
            return new Answer(false,false,letterPlacement,guessesLeft-1);
        }
        //GAME IS EITHER WON OR NO MORE ATTEMPTS REMAIN AND LOSE
        if(isWin || (!isWin && (guessesLeft-1 == 0)) ){
            Answer answer = new Answer(isWord,isWin,letterPlacement,guessesLeft-1);
            finishGame(answer,foundGame);
            return answer;
        }
        else if( !isWord){
            extendGameSessionLife(foundGame);
            return new Answer(isWord,isWin,letterPlacement,guessesLeft);
        }
        extendGameSessionLife(foundGame);
        setGuessesLeft(foundGame.getId(),guessesLeft-1);
        letterPlacement = wordService.compareWords(userGuess.getWord(),foundGame.getWord());
        return new Answer(isWord,isWin,letterPlacement,foundGame.getGuessesLeft());


    }
    public void deleteGame(Game gameToDelete){
        gameToDelete.setUser(null);
        gameRepository.delete(gameToDelete);

    }
    public void saveGame(Game gameToSave){
        gameRepository.save(gameToSave);

    }
}
