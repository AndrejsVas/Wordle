package com.bootcamp.wordle.service;
import com.bootcamp.wordle.model.Word;
import com.bootcamp.wordle.repository.ExtendedWordRepository;
import com.bootcamp.wordle.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.w3c.dom.ranges.RangeException;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class WordService {

    @Autowired
    private WordRepository wordRepository;
    @Autowired
    private ExtendedWordRepository extendedWordRepository;
    public List<Word> getAllWords() {
        List<Word> wordList = null;
        try {
            wordList = new ArrayList<>();
            wordRepository.findAll().forEach(wordList::add);

        } catch (NullPointerException e) {
            System.out.println("List not populated.");
        } catch (RangeException e){
            throw e;
        }
        return wordList;
    }

    public boolean getWordByName(String tryWord){
        return extendedWordRepository.existsByWord(tryWord);
    }

    public int[] compareWords(String userSubmittedWord, String gameSessionWord){
        int[] letterPlacement = new int[5];
        try{
        char[] userSubmittedCharArray  = userSubmittedWord.toLowerCase().toCharArray();
        char[] gameSessionCharArray = gameSessionWord.toLowerCase().toCharArray();
        //Hardcoded Size for now

        for(int i = 0; i < userSubmittedCharArray.length; i++) {
            if (gameSessionCharArray[i] == userSubmittedCharArray[i]) {
                letterPlacement[i] = 3;
                gameSessionCharArray[i] = ' ';
            }
        }
        for(int i = 0; i < userSubmittedCharArray.length; i++) {
            if (gameSessionCharArray[i] != ' ') {
                for (int j = 0; j < gameSessionCharArray.length; j++) {
                    if (userSubmittedCharArray[i] == gameSessionCharArray[j]) {
                        letterPlacement[i] = 2;
                    }
                }
                if (letterPlacement[i] != 2 && letterPlacement[i] != 3)
                    letterPlacement[i] = 1;
            }
        }
        } catch(ArrayIndexOutOfBoundsException e){
            System.out.println("Wrong input size.");
        }
        return letterPlacement;

    }

    public String findRandomWord(){
        Word word = wordRepository.findRandomWord();
        return word.getWord();
    }



}
