import React from 'react';
import WordInput from './WordInput';
import 'bootstrap/dist/css/bootstrap.min.css'


class Game extends React.Component {

    state = { activeInput: 1 };

    componentDidMount() {
        fetch('/api/createGameSession?userName=UserNameNotImplemented')
            .then(response => response.text())
            .then(Id => {
                this.setState({ ...this.state, gameId: Id });
            });
    };

    handleNextInput = () => {
        this.setState(prevState => { return { activeInput: prevState.activeInput + 1 } })
    }

    render() {
        return (
            <div className="game">
                <h1 className="App-title">NOT wordle</h1>
                <WordInput wordLength={5} gameId={this.state.gameId} isActive={this.state.activeInput == 1} onNextInput={this.handleNextInput} />
                <WordInput wordLength={5} gameId={this.state.gameId} isActive={this.state.activeInput == 2} onNextInput={this.handleNextInput} />
                <WordInput wordLength={5} gameId={this.state.gameId} isActive={this.state.activeInput == 3} onNextInput={this.handleNextInput} />
                <WordInput wordLength={5} gameId={this.state.gameId} isActive={this.state.activeInput == 4} onNextInput={this.handleNextInput} />
                <WordInput wordLength={5} gameId={this.state.gameId} isActive={this.state.activeInput == 5} onNextInput={this.handleNextInput} />
                <WordInput wordLength={5} gameId={this.state.gameId} isActive={this.state.activeInput == 6} onNextInput={this.handleNextInput} />
            </div>
        );
    }
}

export default Game;