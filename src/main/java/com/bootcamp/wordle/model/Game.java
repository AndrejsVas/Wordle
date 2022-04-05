package com.bootcamp.wordle.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String word;


    private int guessesLeft;
    private int difficulty;

    public Game(){

    }
    public Game(int guessesLeft){
        this.guessesLeft = guessesLeft;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public int getGuessesLeft() {
        return guessesLeft;
    }

    public void setGuessesLeft(int guessesLeft) {
        this.guessesLeft = guessesLeft;
    }


    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }




}
