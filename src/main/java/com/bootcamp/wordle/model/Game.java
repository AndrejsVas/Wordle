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
    private int currentNumberOfGuesses;
    private int difficulty;

    public Game(){

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

    public int getCurrentNumberOfGuesses() {
        return currentNumberOfGuesses;
    }

    public void setCurrentNumberOfGuesses(int currentNumberOfGuesses) {
        this.currentNumberOfGuesses = currentNumberOfGuesses;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }




}
