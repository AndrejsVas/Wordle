package com.bootcamp.wordle.service;

import com.bootcamp.wordle.model.*;
import com.bootcamp.wordle.repository.GameRepository;
import com.bootcamp.wordle.repository.MultiplayerGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class GameService {
    private static final long SESSION_EXPIRATION = 600000L;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private MultiplayerGameRepository multiplayerGameRepository;
    @Autowired
    private WordService wordService;
    @Autowired
    private UserService userService;

    public Game createGame(User user) {
        //TODO: Potential improvement to next line
        User returnedUser = userService.getUserByNameCreateIfNo(user.getUserName());
        Game game = new Game();
        game.setUser(returnedUser);
        game.setWord(wordService.findRandomWord());
        game.setMultiplayer(false);
        return game;

    }

    public Game createGame(User user, String wordToGuess, boolean isMultiplayer) {
        //TODO: Potential improvement to next line
        User returnedUser = userService.getUserByNameCreateIfNo(user.getUserName());
        Game game = new Game();
        game.setUser(user);
        game.setMultiplayer(isMultiplayer);
        game.setWord(wordToGuess);
        return game;
    }

    public Game createGameFromPickedWord(Game game) {

        gameRepository.save(game);
        return game;
    }

    public MultiplayerGame createMultiplayerGameFromPickedWord(MultiplayerGame multiplayerGame) {
        if(!wordService.getWordByName(multiplayerGame.getWordToGuess()))
                throw new NoSuchElementException("Not a valid word");
        multiplayerGameRepository.save(multiplayerGame);
        return multiplayerGame;
    }

    public Game getGameById(int id) {
        return gameRepository.findById(id);
    }

    public MultiplayerGame getMultiplayerGameById(int id) {
        return multiplayerGameRepository.findById(id);
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


    public void cleanExpiredGames() {
        //TODO:Add suport for deleteting old multiplayer games
        List<Game> allGames = new ArrayList<>();
        gameRepository.findAll().forEach(allGames::add);
        for (Game currentGame : allGames) {
            if (isGameExpired(currentGame)) {
                if(!currentGame.isMultiplayer())
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

    //TODO: Potential refactoring
    public void finishGame(Answer answer, Game finishedGame) {
        User gamePlayer = finishedGame.getUser();
        gamePlayer.setTotalNumberOfGames(gamePlayer.getTotalNumberOfGames() + 1);
        int[] guessedWordsAtAttempt = gamePlayer.getGuessedWordsAtAttempt();
        if (answer.isWin()) {
            int newWinstreak = gamePlayer.getCurrentWinstreak() + 1;
            gamePlayer.setCurrentWinstreak(newWinstreak);
            if (newWinstreak > gamePlayer.getLongestWinstreak())
                gamePlayer.setLongestWinstreak(newWinstreak);
            int wonAtGuessNumber = finishedGame.getGuessesLeft();
            guessedWordsAtAttempt[6 - wonAtGuessNumber] = guessedWordsAtAttempt[6 - wonAtGuessNumber] + 1;
            gamePlayer.setNumberOfWins(gamePlayer.getNumberOfWins() + 1);
            gamePlayer.setGuessedWordsAtAttempt(guessedWordsAtAttempt);
        }
        if (!answer.isWin()) {
            gamePlayer.setCurrentWinstreak(0);
        }
        int wins = gamePlayer.getNumberOfWins();
        int total = gamePlayer.getTotalNumberOfGames();
        int winrate = (wins * 100 / total);
        gamePlayer.setWinrate(winrate);
        userService.saveUser(gamePlayer);
        if (finishedGame.isMultiplayer()) {
            if (answer.isWin()) {
                recordMultiplayerStatistics(finishedGame, gamePlayer.getUserName());
            }
            deleteMultiplayerGame(finishedGame);
        } else
            deleteGame(finishedGame);

    }

    public void recordMultiplayerStatistics(Game finishedGame, String username) {
        MultiplayerGame multiplayerGame = multiplayerGameRepository.findByGameList_id(finishedGame.getId());
        List<String> usernameList = new ArrayList<>();
        int wonAtGuessNumber = 6 - finishedGame.getGuessesLeft();
//            TODO: Check if username is already in list
        switch (wonAtGuessNumber) {
            case 0:
                usernameList = new ArrayList<String>(multiplayerGame.getUsernameListGuessedAt1Attempt());
                usernameList.add(username);
                multiplayerGame.setUsernameListGuessedAt1Attempt(usernameList);
                break;
            case 1:
                usernameList = new ArrayList<String>(multiplayerGame.getUsernameListGuessedAt2Attempt());
                usernameList.add(username);
                multiplayerGame.setUsernameListGuessedAt2Attempt(usernameList);
                break;
            case 2:
                usernameList = new ArrayList<String>(multiplayerGame.getUsernameListGuessedAt3Attempt());
                usernameList.add(username);
                multiplayerGame.setUsernameListGuessedAt3Attempt(usernameList);
                break;
            case 3:
                usernameList = new ArrayList<String>(multiplayerGame.getUsernameListGuessedAt4Attempt());
                usernameList.add(username);
                multiplayerGame.setUsernameListGuessedAt4Attempt(usernameList);
                break;
            case 4:
                usernameList = new ArrayList<String>(multiplayerGame.getUsernameListGuessedAt5Attempt());
                usernameList.add(username);
                multiplayerGame.setUsernameListGuessedAt5Attempt(usernameList);
                break;
            case 5:
                usernameList = new ArrayList<String>(multiplayerGame.getUsernameListGuessedAt6Attempt());
                usernameList.add(username);
                multiplayerGame.setUsernameListGuessedAt6Attempt(usernameList);
                break;

        }
        usernameList.remove("");
        multiplayerGameRepository.save(multiplayerGame);
    }

    public MultiplayerGame addGameToMultiplayerGame(MultiplayerGame multiplayerGame, Game gameToBeAdded){
        Map<Integer, Game> ListOfGameSessionsForMultiplayerGame = multiplayerGame.getGameList();
        if(ListOfGameSessionsForMultiplayerGame.containsKey(gameToBeAdded.getUser().getUserId())){
            return multiplayerGame;
        }
        multiplayerGame.getGameList().put(gameToBeAdded.getUser().getUserId(),gameToBeAdded);
        multiplayerGame.setNumOfPlayersPlayed(multiplayerGame.getNumOfPlayersPlayed()+1);
        saveGame(gameToBeAdded);
        saveGame(multiplayerGame);
        return multiplayerGame;
    }

    public Answer makeAGuess(Guess userGuess) {
        Game foundGame = getGameById(userGuess.getId());
        if (foundGame == null)
            throw new NoSuchElementException("Game not found");
        int guessesLeft = foundGame.getGuessesLeft();
        boolean isWin = userGuess.getWord().equals(foundGame.getWord());
        boolean isWord = wordService.getWordByName(userGuess.getWord());
        int[] letterPlacement = new int[5];
        //GAME IS ALREADY FINISHED
        if (guessesLeft == 0) {
            //TODO: JSON RESPONSE GAME DOES NOT EXIST (IS OVER)
            return new Answer(false, false, letterPlacement, guessesLeft - 1);
        }
        //GAME IS EITHER WON OR NO MORE ATTEMPTS REMAIN AND LOSE
        if (isWin || (!isWin && (guessesLeft - 1 == 0))) {
            Answer answer = new Answer(isWord, isWin, letterPlacement, guessesLeft - 1);
            finishGame(answer, foundGame);
            return answer;
        } else if (!isWord) {
            extendGameSessionLife(foundGame);
            return new Answer(isWord, isWin, letterPlacement, guessesLeft);
        }
        extendGameSessionLife(foundGame);
        setGuessesLeft(foundGame.getId(), guessesLeft - 1);
        letterPlacement = wordService.compareWords(userGuess.getWord(), foundGame.getWord());
        return new Answer(isWord, isWin, letterPlacement, foundGame.getGuessesLeft());


    }


    public void deleteGame(Game gameToDelete) {
        gameToDelete.setUser(null);
        gameRepository.deleteById(gameToDelete.getId());

    }

    public void deleteMultiplayerGame(Game gameToDelete) {
        MultiplayerGame multiplayerGame = multiplayerGameRepository.findByGameList_id(gameToDelete.getId());
        multiplayerGame.getGameList().remove(gameToDelete.getUser().getUserId());
        deleteGame(gameToDelete);
        multiplayerGameRepository.save(multiplayerGame);

    }

    public void saveGame(Game gameToSave) {
        gameRepository.save(gameToSave);
    }

    public void saveGame(MultiplayerGame gameToSave) {
        multiplayerGameRepository.save(gameToSave);
    }
}
