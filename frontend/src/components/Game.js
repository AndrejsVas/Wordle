import React, { Component } from 'react';
import GameGrid from './GameGrid';
import KeyboardDisplay from './Keyboard';
import 'bootstrap/dist/css/bootstrap.min.css'


class Game extends Component {

    state = {
        charList: Array('z'.charCodeAt(0) - 'a'.charCodeAt(0)).fill(0)
    };

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: this.props.userName })
        };
        fetch('/api/createGameSession', requestOptions)
            .then(response => response.json())
            .then(Id => this.setState({
                gameId: Id
            }))
    };

    updateCharList = (word, charStatus) => {
        word = word.toLowerCase();
        let updatedList = this.state.charList;
        for (let i = 0; i < word.length; i++) {
            if (charStatus[i] > updatedList[word.charCodeAt(i) - 'a'.charCodeAt(0)]) {
                updatedList[word.charCodeAt(i) - 'a'.charCodeAt(0)] = charStatus[i];
            };
        };
        this.setState({ charList: updatedList });
    };

    render() {
        return (
            <div className="game">
                <h1 className="App-title">NOT wordle</h1>
                <GameGrid
                    gameId={this.state.gameId}
                    attempts={6}
                    wordLength={5}
                    onUpdateCharList={this.updateCharList}
                />
                <KeyboardDisplay
                    charColor ={this.state.charList}    
                />
            </div>
        );
    };
};

export default Game;