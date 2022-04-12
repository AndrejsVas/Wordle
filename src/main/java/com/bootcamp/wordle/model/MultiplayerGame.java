package com.bootcamp.wordle.model;


import com.bootcamp.wordle.StringListConverter;

import javax.persistence.*;
import java.util.List;
import java.util.Map;

@Entity
@Table(name= "multiplayer_game")
public class MultiplayerGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @ElementCollection
    private Map<Integer, Game> gameList;
    @Convert(converter = StringListConverter.class)
    private List<String> usernameListGuessedAt1Attempt;
    @Convert(converter = StringListConverter.class)
    private List<String> usernameListGuessedAt2Attempt;
    @Convert(converter = StringListConverter.class)
    private List<String> usernameListGuessedAt3Attempt;
    @Convert(converter = StringListConverter.class)
    private List<String> usernameListGuessedAt4Attempt;
    @Convert(converter = StringListConverter.class)
    private List<String> usernameListGuessedAt5Attempt;
    @Convert(converter = StringListConverter.class)
    private List<String> usernameListGuessedAt6Attempt;
    private int numOfPlayersPlayed;
    private String wordToGuess;

    public MultiplayerGame() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Map<Integer, Game> getGameList() {
        return gameList;
    }

    public void setGameList(Map<Integer, Game> gameList) {
        this.gameList = gameList;
    }

    public List<String> getUsernameListGuessedAt1Attempt() {
        return usernameListGuessedAt1Attempt;
    }

    public void setUsernameListGuessedAt1Attempt(List<String> usernameListGuessedAt1Attempt) {
        this.usernameListGuessedAt1Attempt = usernameListGuessedAt1Attempt;
    }

    public List<String> getUsernameListGuessedAt2Attempt() {
        return usernameListGuessedAt2Attempt;
    }

    public void setUsernameListGuessedAt2Attempt(List<String> usernameListGuessedAt2Attempt) {
        this.usernameListGuessedAt2Attempt = usernameListGuessedAt2Attempt;
    }

    public List<String> getUsernameListGuessedAt3Attempt() {
        return usernameListGuessedAt3Attempt;
    }

    public void setUsernameListGuessedAt3Attempt(List<String> usernameListGuessedAt3Attempt) {
        this.usernameListGuessedAt3Attempt = usernameListGuessedAt3Attempt;
    }

    public List<String> getUsernameListGuessedAt4Attempt() {
        return usernameListGuessedAt4Attempt;
    }

    public void setUsernameListGuessedAt4Attempt(List<String> usernameListGuessedAt4Attempt) {
        this.usernameListGuessedAt4Attempt = usernameListGuessedAt4Attempt;
    }

    public List<String> getUsernameListGuessedAt5Attempt() {
        return usernameListGuessedAt5Attempt;
    }

    public void setUsernameListGuessedAt5Attempt(List<String> usernameListGuessedAt5Attempt) {
        this.usernameListGuessedAt5Attempt = usernameListGuessedAt5Attempt;
    }

    public List<String> getUsernameListGuessedAt6Attempt() {
        return usernameListGuessedAt6Attempt;
    }

    public void setUsernameListGuessedAt6Attempt(List<String> usernameListGuessedAt6Attempt) {
        this.usernameListGuessedAt6Attempt = usernameListGuessedAt6Attempt;
    }

    public int getNumOfPlayersPlayed() {
        return numOfPlayersPlayed;
    }

    public void setNumOfPlayersPlayed(int numOfPlayersPlayed) {
        this.numOfPlayersPlayed = numOfPlayersPlayed;
    }

    public String getWordToGuess() {
        return wordToGuess;
    }

    public void setWordToGuess(String wordToGuess) {
        this.wordToGuess = wordToGuess;
    }
}
