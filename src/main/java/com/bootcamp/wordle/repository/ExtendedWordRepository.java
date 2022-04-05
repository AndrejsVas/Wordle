package com.bootcamp.wordle.repository;

import com.bootcamp.wordle.model.ExtendedWord;
import com.bootcamp.wordle.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ExtendedWordRepository extends JpaRepository<ExtendedWord, String> {
    Boolean existsByWord(String word);
}
