import React, { Component } from 'react';
import RulesPop from './components/RulesPop';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Game from './components/Game';

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Game />
                 <RulesPop />
                </header>                             
            </div>
        );
    }
}

export default App;