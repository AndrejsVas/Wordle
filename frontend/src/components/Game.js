import React from 'react';
import WordInput from './WordInput';

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <WordInput />
                <WordInput />
                <WordInput />
                <WordInput />
                <WordInput />
                <WordInput />
            </div>
        );
    }
}

export default Game;