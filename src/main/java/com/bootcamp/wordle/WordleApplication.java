package com.bootcamp.wordle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.DriverManager;
@SpringBootApplication
@EnableScheduling
public class WordleApplication {
	public static Connection db = null;
	public static void main(String[] args) {
		SpringApplication.run(WordleApplication.class, args);
	}



}
