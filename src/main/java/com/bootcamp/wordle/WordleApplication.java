package com.bootcamp.wordle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.DriverManager;
@SpringBootApplication
public class WordleApplication {
	public static Connection db = null;
	public static void main(String[] args) {
		SpringApplication.run(WordleApplication.class, args);
	}



}
