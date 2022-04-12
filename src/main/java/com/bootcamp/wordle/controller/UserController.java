package com.bootcamp.wordle.controller;

import com.bootcamp.wordle.model.User;
import com.bootcamp.wordle.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Operation(summary = "Get individual statistics for a specific user")
    @ApiResponse(responseCode = "200", description = "User statistics fetched" )
    @ApiResponse(responseCode = "404", description = "User not found" )
    @GetMapping(value = "api/user/getStats")
    public User getUserStats(
            @Parameter(description = "The user name of the requested user")
            @RequestParam String userName ){
        return userService.getUserByName(userName);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleNoSuchElementFoundException(
            NoSuchElementException exception
    ) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(exception.getMessage());
    }
}
