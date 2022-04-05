package com.bootcamp.wordle.repository;

import com.bootcamp.wordle.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface WordRepository extends JpaRepository<Word, String> {
    Boolean existsByWord(String word);
}
