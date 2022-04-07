import React from 'react';
import WordInput from './WordInput';
import 'bootstrap/dist/css/bootstrap.min.css'


class Game extends React.Component {

    state = {};

    componentDidMount() {
        fetch('/api/createGameSession')
            .then(response => response.text())
            .then(Id => {
                this.setState({ ...this.state, gameId: Id });
            });
    };

    render() {
        return (
            <div className="game">
                <h1 className="App-title">wordle</h1>
                <WordInput wordLength="5" gameId={this.state.gameId} />
                <WordInput wordLength="5" gameId={this.state.gameId} />
                <WordInput wordLength="5" gameId={this.state.gameId} />
                <WordInput wordLength="5" gameId={this.state.gameId} />
                <WordInput wordLength="5" gameId={this.state.gameId} />
                <WordInput wordLength="5" gameId={this.state.gameId} />
            </div>
        );
    }
}

export default Game;