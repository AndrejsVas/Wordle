import React, { Component } from 'react';

import StartButton from './StartButton';

import './Game.css'


class Game extends Component {

    NUMBER_OF_LETTERS = 5;
    NUMBER_OF_GUESSES = 6;
    guessesRemaining = this.NUMBER_OF_GUESSES
    currentGuess = []
    nextLetter = 0

    gridBoxRefs = []
    keyboardButtonRefs = []

    state = {
        isGameStarted: false
    }

    handleKeyUp = (event) => {
        if (this.state.guessesLeft <= 0) {
            return
        }

        let pressedKey = String(event.key)
        if (pressedKey === "Backspace" && this.nextLetter !== 0) {
            this.deleteLetter()
            return
        }

        if (pressedKey === "Enter") {
            this.checkGuess()
            return
        }

        let found = pressedKey.match(/[a-z]/gi)
        if (!found || found.length > 1) {
            return
        } else {
            this.insertLetter(pressedKey)
        }
    }

    insertLetter = (pressedKey) => {
        if (this.nextLetter === this.NUMBER_OF_LETTERS) {
            return
        }
        pressedKey = pressedKey.toLowerCase()

        let box = this.gridBoxRefs[6 - this.guessesRemaining][this.nextLetter]
        box.textContent = pressedKey
        box.classList.add("filled-box")
        this.currentGuess.push(pressedKey)
        this.nextLetter += 1
    }

    deleteLetter = () => {
        let box = this.gridBoxRefs[6 - this.guessesRemaining][this.nextLetter - 1]
        box.textContent = ""
        box.classList.remove("filled-box")
        this.currentGuess.pop()
        this.nextLetter -= 1
    }

    checkGuess = () => {
        let guessString = this.currentGuess.join('');

        if (guessString.length !== this.NUMBER_OF_LETTERS) {
            alert("Not enough letters!") //TODO make animation
            return
        }


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.props.gameId, word: guessString })
        };
        let numberOfTries
        let isWord
        let isWin
        let charStatus
        fetch('/api/guess', requestOptions)
            .then(response => response.json())
            .then(data => {
                numberOfTries = data.numberOfTries
                isWord = data.word
                isWin = data.win
                charStatus = isWin ? Array(this.NUMBER_OF_LETTERS).fill(3) : data.charStatus
            })


        if (!isWord) {
            alert("Word not in list!") //TODO make animation
            return
        }

        this.coloring(charStatus)

        if (isWin) {
            alert("You guessed right! Game over!")  //TODO add popup
            this.guessesRemaining = 0
            return
        }

        this.guessesRemaining = numberOfTries;
        this.currentGuess = [];
        this.nextLetter = 0;

        if (this.guessesRemaining === 0) {
            alert("You've run out of guesses! Game over!")  //TODO add popup
            // alert(`The right word was: "${rightGuessString}"`)  //TODO backend task => give me right word after last guess + also give me charStatus
        }

    }

    coloring = (charStatus) => {
        for (let i = 0; i < this.NUMBER_OF_LETTERS; i++) {
            let coloringClassName = charStatus[i] === 0 ? 'no-data' : charStatus[i] === 1 ? 'not-in-word' : charStatus[i] === 2 ? 'in-word' : charStatus[i] === 3 ? 'in-place' : 'error'
            this.gridBoxRefs[6 - this.guessesRemaining][i].classList.add(coloringClassName)

            let key = this.keyboardButtonRefs[this.currentGuess[i]]

            if (!key.classList.includes('in-place') && coloringClassName === 'in-place') {
                key.classList.add(coloringClassName)
            }
            else if (!key.classList.includes('in-place') && !key.classList.includes('in-word') && coloringClassName === 'in-word') {
                key.classList.add(coloringClassName)
            }
            else if (!key.classList.includes('in-place') && !key.classList.includes('in-word') && !key.classList.includes('not-in-word') && coloringClassName === 'not-in-word') {
                key.classList.add(coloringClassName)
            }
        }
    }

    render() {
        const { isGameStarted } = this.state;
        window.addEventListener('keyup', this.handleKeyUp)
        return (
            <div className='game' onKeyUp={this.handleKeyUp}>
                <StartButton
                    isGameStarted={isGameStarted}
                    setIsGameStarted={value => this.setState({ isGameStarted: value })}
                    setGridBoxRefs={gridBoxRefs => this.gridBoxRefs = gridBoxRefs}
                    setKeyboardButtonRefs={(name, ref) => this.keyboardButtonRefs[name] = ref}
                    letters={this.NUMBER_OF_LETTERS}
                    guesses={this.NUMBER_OF_GUESSES}
                />
            </div>
        );
    }
}

export default Game;