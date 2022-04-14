package com.bootcamp.wordle.model;

import java.util.HashMap;
import java.util.Map;

public class Answer {
    private boolean isWord;
    private boolean isWin;

    private int numberOfTries;
    private int wordLength = 5;
    private int[] charStatus = new int[wordLength];
    private boolean isFinished;
    private String correctWord;

    public Answer(boolean isWord, boolean isWin, int[] charStatus, int guessesLeft, boolean isFinished) {
        this.isWord = isWord;
        this.isWin = isWin;
        this.charStatus = charStatus;
        this.numberOfTries = guessesLeft;
        this.isFinished = isFinished;
    }
    public Answer(boolean isWord, boolean isWin, int[] charStatus, int guessesLeft, boolean isFinished,String correctWord) {
        this.isWord = isWord;
        this.isWin = isWin;
        this.charStatus = charStatus;
        this.numberOfTries = guessesLeft;
        this.isFinished = isFinished;
        this.correctWord = correctWord;
    }

    public int[] getCharStatus() { return charStatus; }

    public void setCharStatus(int[] charStatus) {
        this.charStatus = charStatus;
    }

    public boolean isWord() {
        return isWord;
    }

    public void setWord(boolean word) {
        isWord = word;
    }

    public boolean isWin() {
        return isWin;
    }

    public void setWin(boolean win) {
        isWin = win;
    }
    public int getNumberOfTries() {
        return numberOfTries;
    }

    public void setNumberOfTries(int numberOfTries) {
        this.numberOfTries = numberOfTries;
    }

    public boolean isFinished() {
        return isFinished;
    }

    public void setFinished(boolean finished) {
        isFinished = finished;
    }

    public String getCorrectWord() {
        return correctWord;
    }

    public void setCorrectWord(String correctWord) {
        this.correctWord = correctWord;
    }
}


//
//0 - No data
//1 - Not in word
//2 - In word not in place
//3 - In word in place