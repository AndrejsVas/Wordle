package com.bootcamp.wordle.controller;

import com.bootcamp.wordle.model.Word;
import com.bootcamp.wordle.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WordController {

    @Autowired
    private WordService wordService;
    @GetMapping("/")
    public String welcome()
    {
        return "<html><body>"
                + "<h1>WELCOME</h1>"
                + "</body></html>";
    }
    @GetMapping("/words")
    public List<Word> getAllWords(){
        return wordService.getAllWords();
    }

}
