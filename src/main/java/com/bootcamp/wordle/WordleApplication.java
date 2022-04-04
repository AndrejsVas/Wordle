package com.bootcamp.wordle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.sql.*;

@SpringBootApplication
public class WordleApplication {

	public static void main(String[] args) {
		SpringApplication.run(WordleApplication.class, args);

		String sqlSelectAllPersons = "SELECT * FROM test";
		String connectionUrl = "jdbc:mysql://sql11.freesqldatabase.com:3306/sql11483474";

		try (Connection conn = DriverManager.getConnection(connectionUrl, "sql11483474", "jSl3w8JbHV");
			 PreparedStatement ps = conn.prepareStatement(sqlSelectAllPersons);
			 ResultSet rs = ps.executeQuery()) {

			while (rs.next()) {
				long id = rs.getLong("id");
				String word = rs.getString("Word");
				System.out.println(id+" "+word);

				// do something with the extracted data...
			}
		} catch (SQLException e) {
			// handle the exception
		}
	}
	// Deniels was here
}
