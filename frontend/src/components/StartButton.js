import React, { Component } from "react";
import { Button } from 'react-bootstrap';

import MainGame from './MainGame';

class StartButton extends Component {

    // ({userName, isGameStarted, setIsGameStarted, setGridBoxRefs, setKeyboardButtonRefs, handleOnClick, letters, guesses }) 

    state = {
        gameVariant: 0 // 0: regular, 1: Chalange_link ...
    }

    startGame = async () => {

        if (this.state.gameVariant === 1) {
            await this.loadLinkGame()
        } else {
            await this.loadRegularGame()
        }

        this.props.setIsGameStarted(true)
    }

    loadRegularGame = async () => {
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
            body: JSON.stringify({ userName: this.props.userName, id: this.props.linkId })
        };
        await fetch('/api/multiplayerGame/challengeLink', requestOptions)
            .then(response => response.json())
            .then(Id => this.setState({
                gameId: Id
            }))
    }

    render() {
        const { userName, isGameStarted, setGridBoxRefs, setKeyboardButtonRefs, handleOnClick, letters, guesses } = this.props

        if (isGameStarted) {
            return (
                <MainGame
                    userName={userName}
                    gameId={this.state.gameId}
                    setGridBoxRefs={setGridBoxRefs}
                    setKeyboardButtonRefs={setKeyboardButtonRefs}
                    handleOnClick={handleOnClick}
                    letters={letters}
                    guesses={guesses}
                />
            )
        } else {
            return (
                <Button
                    variant='outline-light'
                    onClick={this.startGame}
                >
                    {this.state.gameVariant === 0 ? 'Start Game' : 'Start Game From Link'}
                </Button>
            )
        }
    }
}

export default StartButton;