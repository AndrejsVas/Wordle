import React, { Component } from 'react';

import StartButton from './StartButton';

import './Game.css'


class Game extends Component {

    NUMBER_OF_LETTERS = 5;
    NUMBER_OF_GUESSES = 6;
    guessesRemaining = this.NUMBER_OF_GUESSES
    currentGuess = []
    nextLetter = 0

    isConnecting = false;

    gridBoxRefs = []
    keyboardButtonRefs = []

    state = {
        isGameStarted: false,
    }

    componentDidMount() {
        if (this.props.challangeId * 1 > -1) this.setState({ gameVariant: 1 })
        else this.setState({ gameVariant: 0 })
    }

    handleKeyUp = ({ key }) => {
        if (this.state.guessesLeft <= 0 || this.props.isPopup) {
            return
        }

        let pressedKey = String(key)
        if (pressedKey === "Backspace" && this.nextLetter !== 0) {
            this.deleteLetter()
            return
        }

        if (pressedKey === "Enter" && this.guessesRemaining > 0) {
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

    checkGuess = async () => {
        if (this.isConnecting) return
        this.isConnecting = true;
        let guessString = this.currentGuess.join('');

        if (guessString.length !== this.NUMBER_OF_LETTERS) {
             //TODO make animation
            this.isConnecting = false;
            return
        }


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.gameId, word: guessString })
        };
        let numberOfTries
        let isWord
        let isWin
        let isFinished
        let charStatus
        let correctWord
        await fetch('/api/guess', requestOptions)
            .then(response => response.json())
            .then(data => {
                numberOfTries = data.numberOfTries
                isWord = data.word
                isWin = data.win
                isFinished = data.finished
                charStatus = isWin ? Array(this.NUMBER_OF_LETTERS).fill(3) : data.charStatus
                correctWord = data.correctWord
                console.log('/api/guess', data);
            })


        if (!isWord) {
            this.gridBoxRefs[6 - this.guessesRemaining][0].parentElement.classList.add('bad-word') //TODO remove after time

            this.isConnecting = false;
            return
        }

        this.coloring(charStatus)

        if (isWin) {
            console.log("You guessed right! Game over!")  //TODO add win popup
            this.guessesRemaining = 0
            this.isConnecting = false;
            return
        }

        this.guessesRemaining = numberOfTries;
        this.currentGuess = [];
        this.nextLetter = 0;

        if (this.guessesRemaining === 0) {
            console.log("You've run out of guesses! Game over!")  //TODO add loose popup
        }

        this.isConnecting = false;
    }

    coloring = (charStatus) => {
        for (let i = 0; i < this.NUMBER_OF_LETTERS; i++) {
            let color = charStatus[i] === 1 ? 'rgba(121, 121, 121, 0.5)' : charStatus[i] === 2 ? 'rgba(251, 255, 0, 0.5)' : 'rgba(0, 255, 55, 0.5)'
            this.gridBoxRefs[6 - this.guessesRemaining][i].style.backgroundColor = color

            let key = this.keyboardButtonRefs[this.currentGuess[i]]
            let oldColor = key.style.backgroundColor
            if (oldColor === 'rgba(0, 255, 55, 0.5)') {
                continue
            } 

            if (oldColor === 'rgba(251, 255, 0, 0.5)' && color !== 'rgba(0, 255, 55, 0.5)') {
                continue
            }

            key.style.backgroundColor = color
        }
    }

    checkClassNameExistence = (ref, className) => {
        if (ref.classList.findIndex(name => { return name === className; }) === -1) return false
        return true
    }

    render() {
        const { isGameStarted } = this.state;
        return (
            <div className='game'>
                <StartButton
                    userName={this.props.userName}
                    challangeId={this.props.challangeId}
                    gameVariant={this.state.gameVariant}
                    setGameId={gameId => this.setState({ gameId: gameId })}
                    isGameStarted={isGameStarted}
                    setIsGameStarted={value => this.setState({ isGameStarted: value })}
                    setGridBoxRefs={gridBoxRefs => this.gridBoxRefs = gridBoxRefs}
                    setKeyboardButtonRefs={(name, ref) => this.keyboardButtonRefs[name] = ref}
                    handleOnClick={key => { this.handleKeyUp({ key }) }}
                    handleKeyUp={this.handleKeyUp}
                    letters={this.NUMBER_OF_LETTERS}
                    guesses={this.NUMBER_OF_GUESSES}
                />
            </div>
        );
    }
}

export default Game;