package com.bootcamp.wordle.model;

import java.util.HashMap;
import java.util.Map;

public class Answer {
    private boolean isWord;
    private boolean isWin;

    private int numberOfTries;
    private int wordLength = 5;
    private int[] charStatus = new int[wordLength];

    public Answer(boolean isWord, boolean isWin, int[] charStatus, int guessesLeft) {
        this.isWord = isWord;
        this.isWin = isWin;
        this.charStatus = charStatus;
        this.numberOfTries = guessesLeft;

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
}


//
//0 - No data
//1 - Not in word
//2 - In word not in place
//3 - In word in place