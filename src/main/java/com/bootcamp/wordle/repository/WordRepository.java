package com.bootcamp.wordle.repository;

import com.bootcamp.wordle.model.Word;
import org.springframework.data.repository.CrudRepository;

public interface WordRepository extends CrudRepository<Word, String> {
}
