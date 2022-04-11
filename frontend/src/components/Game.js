import React from 'react';
import GameGrid from './GameGrid';
import 'bootstrap/dist/css/bootstrap.min.css'


class Game extends React.Component {

    state = {
        charList: Array('z'.charCodeAt(0) - 'a'.charCodeAt(0)).fill(0)
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
                    attempts={6}
                    wordLength={5}
                    onUpdateCharList={this.updateCharList}
                />
            </div>
        );
    };
};

export default Game;