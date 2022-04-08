package com.bootcamp.wordle.controller;

import com.bootcamp.wordle.model.User;
import com.bootcamp.wordle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    //user/getStats?userName=sampleName
    @GetMapping("api/user/getStats")
    public User getUserStats(@RequestParam String userName){
        return userService.getUserByName(userName);
    }
}
