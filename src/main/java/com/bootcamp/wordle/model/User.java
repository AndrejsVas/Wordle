package com.bootcamp.wordle.model;

import javax.persistence.*;
import java.util.Set;

@Entity

@Table(name= "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int UserId;
    @Column(name = "userName")
    private String userName;
    private int totalNumberOfGames;
    private int currentWinstreak;
    private int longestWinstreak;
    private int winrate;
    private int[] guessedWordsAtAttempt;


    @OneToMany(mappedBy = "user")
    private Set<Game> game;

    public Set<Game> getGame() {
        return game;
    }

    public void setGame(Set<Game> game) {
        this.game = game;
    }


    public User() {
    }
    public int getUserId() {
        return UserId;
    }

    public void setUserId(int userId) {
        UserId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getTotalNumberOfGames() {
        return totalNumberOfGames;
    }

    public void setTotalNumberOfGames(int totalNumberOfGames) {
        this.totalNumberOfGames = totalNumberOfGames;
    }

    public int getCurrentWinstreak() {
        return currentWinstreak;
    }

    public void setCurrentWinstreak(int currentWinstreak) {
        this.currentWinstreak = currentWinstreak;
    }

    public int getLongestWinstreak() {
        return longestWinstreak;
    }

    public void setLongestWinstreak(int longestWinstreak) {
        this.longestWinstreak = longestWinstreak;
    }

    public int getWinrate() {
        return winrate;
    }

    public void setWinrate(int winrate) {
        this.winrate = winrate;
    }

    public int[] getGuessedWordsAtAttempt() {
        return guessedWordsAtAttempt;
    }

    public void setGuessedWordsAtAttempt(int[] guessedWordsAtAttempt) {
        this.guessedWordsAtAttempt = guessedWordsAtAttempt;
    }



}
