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
		createDb();
		SpringApplication.run(WordleApplication.class, args);
	}
	public static void createDb() {
		try {
			Class.forName("org.sqlite.JDBC");
			db = DriverManager.getConnection("jdbc:sqlite:sample.db");
		} catch ( Exception e ) {
			System.err.println( e.getClass().getName() + ": " + e.getMessage() );
			System.exit(0);
		}
		System.out.println("Opened database successfully");
	}
}
