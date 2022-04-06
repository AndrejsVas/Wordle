package com.bootcamp.wordle;

import com.bootcamp.wordle.service.WordService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.Assert.*;

@SpringBootTest
class WordleApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	public void testCompareWords () {
		int [] expected = new int[]{2, 1, 3, 2, 1};
		assertArrayEquals(expected,WordService.compareWords("poppy","apple"));
	}

}
