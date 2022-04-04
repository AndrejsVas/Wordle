package com.bootcamp.wordle.service;
import com.bootcamp.wordle.model.Word;
import com.bootcamp.wordle.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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



}
