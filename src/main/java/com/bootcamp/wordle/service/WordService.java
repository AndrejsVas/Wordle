package com.bootcamp.wordle.service;
import com.bootcamp.wordle.model.Word;
import com.bootcamp.wordle.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class WordService {

    @Autowired
    private WordRepository wordRepository;
    public List<Word> getAllWords(){
        List<Word> wordList = new ArrayList<>();
        wordRepository.findAll().forEach(wordList::add);
        return wordList;
    }

    public boolean getWordByName(String tryWord){
        return wordRepository.existsByWord(tryWord);
    }

    public int[] compareWords(String userSubmittedWord, String gameSessionWord){
        char[] userSubmittedCharArray  = userSubmittedWord.toLowerCase().toCharArray();
        char[] gameSessionCharArray = gameSessionWord.toLowerCase().toCharArray();
        //Hardcoded Size for now
        int[] letterPlacement = new int[5];

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
        return letterPlacement;

    }



}
