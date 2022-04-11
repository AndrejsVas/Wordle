import React, { Component } from 'react';

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'

import Game from './components/Game';
import RulesPop from './components/RulesPop';
import UserStartPop from './components/UserStartPop';

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
                 <UserStartPop />

                </header>
            </div>
        );
    }
}

export default App;