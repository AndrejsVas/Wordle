package com.bootcamp.wordle.controller;

import com.bootcamp.wordle.service.GameService;
import com.bootcamp.wordle.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping("/api/createGameSession")
    public int createGameSession() {
        return gameService.createGame().getId();
    }


}
