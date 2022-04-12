import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './Game.css'
import Keyboard from './Keyboard';



class Game extends Component {

    state = {
        isGameStarted: false
    }

    startGame = () => {
        if (!this.state.isGameStarted) {
            return (
                <Button
                    variant='outline-light'
                    onClick={() => this.setState({ isGameStarted: true })}
                >
                    Start Game
                </Button>
            )
        } else {
            return (
                <>
                    {this.gameGrid()}
                    <Keyboard />
                </>
            )
        }
    }

    gameGrid = () => {
        let grid = []

        for (let row = 0; row < this.props.guesses; row++) {
            let rowItem = []
            for (let box = 0; box < this.props.wordLength; box++) {
                rowItem.push(
                    <div
                        className='letter-box'
                        key={'box' + box}
                        style={{
                            maxWidth: 90 / this.props.wordLength + 'vw',
                            maxHeight: 90 / this.props.wordLength + 'vw'
                        }}
                    />
                )
            }
            grid.push(
                <div className='letter-row' key={'row' + row}>{rowItem}</div>
            )
        }
        return grid
    }


    render() {
        console.log(this.gameGrid());
        return (
            <div className='game'>
                {this.startGame()}
            </div>
        );
    }
}

export default Game;