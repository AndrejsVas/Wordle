import React from 'react';
import WordInput from './WordInput';


class Game extends React.Component {

    state = {};

    componentDidMount() {
        fetch('/api/createGameSession')
            .then(response => response.text())
            .then(Id => {
                this.setState({ Id: Id });
            });
    };

    render() {
        return (
            <div className="game">
                <h1 className="App-title">{this.state.Id}</h1>
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