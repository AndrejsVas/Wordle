package com.bootcamp.wordle.model;

import java.util.HashMap;
import java.util.Map;

public class Answer {
    private boolean isWord;
    private boolean isWin;
    //private Map<Integer,Integer> charValues;
    private int char0;
    private int char1;
    private int char2;
    private int char3;
    private int char4;

    public Answer() {
        this.isWord=true;
        this.isWin = false;
        this.char0 = 0;
        this.char1 = 1;
        this.char2 = 2;
        this.char3 = 1;
        this.char4 = 2;

    }

    public int getChar0() {
        return char0;
    }

    public void setChar0(int char0) {
        this.char0 = char0;
    }

    public int getChar1() {
        return char1;
    }

    public void setChar1(int char1) {
        this.char1 = char1;
    }

    public int getChar2() {
        return char2;
    }

    public void setChar2(int char2) {
        this.char2 = char2;
    }

    public int getChar3() {
        return char3;
    }

    public void setChar3(int char3) {
        this.char3 = char3;
    }

    public int getChar4() {
        return char4;
    }

    public void setChar4(int char4) {
        this.char4 = char4;
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
//0 - nepravilnoe
//1 - pravilnoe
//2 - nepravilnoe mesto
//3 - pravilnoe vse