package com.bootcamp.wordle.controller;


import com.bootcamp.wordle.service.WordService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class WordController {


    @Autowired
    private WordService wordService;

    @Operation(summary = "Get a random word")
    @GetMapping(value = "/api/word/getRandomWord")
    public String createGameSession( ){
        return wordService.findRandomWord();
    }

}
