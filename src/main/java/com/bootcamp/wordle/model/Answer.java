package com.bootcamp.wordle.model;

import java.util.HashMap;
import java.util.Map;

public class Answer {
    private boolean isWord;
    private boolean isWin;
    //private Map<Integer,Integer> charValues;

    private int wordLength = 5;
    private int[] charStatus = new int[wordLength];

    public Answer() {
        this.isWord = true;
        this.isWin = false;
        this.charStatus[0] = 0;
        this.charStatus[1] = 1;
        this.charStatus[2] = 2;
        this.charStatus[3] = 1;
        this.charStatus[4] = 2;
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
}


//
//0 - No data
//1 - Not in word
//2 - In word not in place
//3 - In word in place