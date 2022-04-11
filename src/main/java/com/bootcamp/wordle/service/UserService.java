package com.bootcamp.wordle.service;

import com.bootcamp.wordle.model.User;
import com.bootcamp.wordle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getUserByName(String userName){
        if (!userRepository.existsByUserName(userName)){
            throw new NoSuchElementException("No such user exists");

        }
        User userToReturn =  userRepository.findByUserName(userName);
        userToReturn.setGame(null);
        return userToReturn;
    }
    public User getUserByNameCreateIfNo(String userName){
        if (!userRepository.existsByUserName(userName)){
            return createUser(userName);
        }
        return userRepository.findByUserName(userName);
    }

    public User createUser(String userName){
        User newUser = new User();
        newUser.setUserName(userName);
        newUser.setTotalNumberOfGames(0);
        newUser.setCurrentWinstreak(0);
        newUser.setLongestWinstreak(0);
        newUser.setWinrate(0);
        int[] guessedWordsAtAttempt = new int[6];
        newUser.setGuessedWordsAtAttempt(guessedWordsAtAttempt);

        userRepository.save(newUser);
        return newUser;
    }

    public void saveUser(User userToSave){
        userRepository.save(userToSave);
    }
}
