import React, { Component } from 'react';

import StartButton from './StartButton';

import './Game.css'


class Game extends Component {

    NUMBER_OF_LETTERS = 5;
    NUMBER_OF_GUESSES = 6;

    state = {
        guessesLeft: this.NUMBER_OF_GUESSES,
        isGameStarted: false,
        currentGuess: [],
        nextLetter: 0
    }

    handleKeyUp = (event) => {
        if (this.state.guessesLeft <= 0) {
            return
        }

        let pressedKey = String(event.key)
        if (pressedKey === "Backspace" && this.state.nextLetter !== 0) {
            // deleteLetter()
            return
        }

        if (pressedKey === "Enter") {
            // checkGuess()
            return
        }

        let found = pressedKey.match(/[a-z]/gi)
        if (!found || found.length > 1) {
            return
        } else {
            // insertLetter(pressedKey)
        }
    }

    render() {
        const { isGameStarted } = this.state;
        return (
            <div className='game' onKeyUp={this.handleKeyUp}>
                <StartButton
                    isGameStarted={isGameStarted}
                    setIsGameStarted={value => this.setState({ isGameStarted: value })}
                    letters={this.NUMBER_OF_LETTERS}
                    guesses={this.NUMBER_OF_GUESSES}
                />
            </div>
        );
    }
}

export default Game;