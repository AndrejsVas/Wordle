package com.bootcamp.wordle;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.safari.SafariDriver;

import java.time.Duration;

public class SeleniumDemo {
    @Test
    public void chromeSession() {
        WebDriverManager.chromedriver().setup();

        WebDriver driver = new ChromeDriver();
        driver = new ChromeDriver();

        driver.get("https://google.com");

        driver.getTitle(); // => "Google"
     //   driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));

        WebElement searchBox = driver.findElement(By.name("q"));
        WebElement searchButton = driver.findElement(By.name("btnK"));

        searchBox.sendKeys("Selenium");
        searchButton.click();

        searchBox = driver.findElement(By.name("q"));
        searchBox.getAttribute("value"); // => "Selenium"

        driver.quit();
    }

    @Test
    public void edgeSession() {
        WebDriverManager.edgedriver().setup();

        WebDriver driver = new EdgeDriver();

        driver.quit();
    }

    @Test
    public void firefoxSession() {
        WebDriverManager.firefoxdriver().setup();

        WebDriver driver = new FirefoxDriver();

        driver.quit();
    }

    @Disabled("Only runs on Windows")
    @Test
    public void ieSession() {
        WebDriverManager.iedriver().setup();

        WebDriver driver = new InternetExplorerDriver();

        driver.quit();
    }
}
