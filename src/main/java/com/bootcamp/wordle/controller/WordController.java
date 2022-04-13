package com.bootcamp.wordle.controller;


import com.bootcamp.wordle.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class WordController {


    @Autowired
    private WordService wordService;

    @GetMapping(value = "/api/word/getRandomWord")
    public String createGameSession( ){
        return wordService.findRandomWord();
    }

}
