import React, { Component } from "react";
import { Button } from 'react-bootstrap';

import MainGame from './MainGame';

class StartButton extends Component {

    startGame = async () => {
        if (this.props.challangeId !== null) {
            await this.loadLinkGame()
        } else {
            await this.loadRegularGame()
        }

        this.props.setIsGameStarted(true)
    }

    loadRegularGame = async () => {
        console.log('reg');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: this.props.userName })
        };
        await fetch('/api/createGameSession', requestOptions)
            .then(response => response.json())
            .then(id => this.props.setGameId(id))
    }

    loadLinkGame = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: this.props.userName, id: this.props.challangeId * 1 })
        };
        await fetch('/api/multiplayerGame/challengeLink', requestOptions)
            .then(response => response.json())
            .then(id => { this.props.setGameId(id); })
    }

    render() {

        if (this.props.isGameStarted) {
            return (
                <MainGame
                    userName={this.props.userName}
                    setGridBoxRefs={this.props.setGridBoxRefs}
                    setKeyboardButtonRefs={this.props.setKeyboardButtonRefs}
                    handleOnClick={this.props.handleOnClick}
                    handleKeyUp={this.props.handleKeyUp}
                    letters={this.props.letters}
                    guesses={this.props.guesses}
                />
            )
        } else {
            return (
                <Button
                    variant='outline-light'
                    onClick={this.startGame}
                >
                    {this.props.challangeId === null ? 'Start Game' : 'Start Game From Link'}
                </Button>
            )
        }
    }
}

export default StartButton;