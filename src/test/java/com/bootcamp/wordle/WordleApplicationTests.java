package com.bootcamp.wordle;

import com.bootcamp.wordle.controller.GameController;
import com.bootcamp.wordle.model.Word;
import com.bootcamp.wordle.service.GameService;
import com.bootcamp.wordle.service.WordService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@SpringBootTest
class WordleApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	public void testCompareWords () {
		WordService test = new WordService();
		int [] expected = new int[]{2, 1, 3, 2, 1};
		assertArrayEquals(expected,test.compareWords("poppy","apple"));
		expected = new int[]{1, 1, 2, 1, 3};
		assertArrayEquals(expected,test.compareWords("stare","apple"));
		expected = new int[]{3, 3, 3, 3, 3};
		assertArrayEquals(expected,test.compareWords("apple","apple"));
	}
}
