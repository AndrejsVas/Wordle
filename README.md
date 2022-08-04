# Wordle
## Accenture Bootcamp
This web app was created as a team effort for Accentures Bootcamp final project. The team consisted of people with different backgrounds and experiences.


## Summary of idea/application
The project aimed at creating a word guessing games similar to the popular browser game Wordle. The user's aim is to guess the 5 letter word, picked randomly from the database. User has 5 guesses, and every guess attempt, the application returns information on which letters from the attempted word match the picked word, and whether the letters are in a matching position. When the game finishes, a window opens with the personal statistics for that username, such as the win streak and the win rate.
The main additional functionality is allowing users to pick the word themselves and generate a link to the game with the user picked word. The game created in such a way, is considered to be a multiplayer game. A multiplayer game can be played by multiple users who joined via the link, and users compete with each other to guess the word in the smallest number of attempts. After the user finishes his own game, a window opens with statistics for the game shared via the link. E.g. the list of usernames who guessed the word in n attempts.


## Project Structure
The java project is structured in a way typical for Java Spring web applications which use Spring Data JPA. The project was split into packages consisting of the 3 main subpackages:
Controllers, Services, and Model. We aimed to keep controllers thin and make sure that the bulk of our application processing is done using the service classes in the service subpackage. Some of the classes in the models subpackage were designed to be DTO type objects which are returned to the front end in the form of a JSON response, serialised by Spring. Others represent specific tables in the database. We used JPA as our main way of communicating with the database, and certain model classes were used to create tables automatically by Spring Data JPA.

## Rules
![alt text](https://user-images.githubusercontent.com/102141523/182856221-96d2bb48-b724-4ccc-b442-3bb2dcaf7962.png)


## Swagger documentation
![alt text](https://user-images.githubusercontent.com/102141523/182856107-a1f6f75c-4d55-48b2-a701-e200b3f9704b.png)
