import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Game from './components/Game';

class App extends Component {

    state = {};

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Game />
                </header>
            </div>
        );
    }
}

export default App;