package com.bootcamp.wordle.service;
import com.bootcamp.wordle.model.Game;
import com.bootcamp.wordle.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;
    public Game createGame(){
        Game game = new Game();
        return gameRepository.save(game);

    }

}
