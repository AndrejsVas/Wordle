import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Game from './components/Game';

class App extends Component {

    state = {};

    componentDidMount() {
        setInterval(this.getID, 250);
    }

    getID = () => {
        fetch('/api/createGameSession')
            .then(response => response.text())
            .then(message => {
                this.setState({message: message});
            });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">{this.state.message}</h1>
                    <Game />
                </header>
            </div>
        );
    }
}

export default App;