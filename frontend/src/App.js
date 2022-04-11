import React, { Component } from 'react';

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'

import RulesPop from './components/RulesPop';
import Game from './components/Game';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {

    state = {
        userName: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })
    }

    render() {
        console.log(this.state.userName);
        return (
            <div className="App">
                <header className="App-header">
                    <Game userName={this.state.userName} />
                 <RulesPop />
                </header>                             
            </div>
        );
    }
}

export default App;