import React, { Component } from 'react';

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'

import PreGame from './components/PreGame';
import RulesPop from './components/RulesPop';
import UserStartPop from './components/UserStartPop';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {

    state = {
        userName: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })
    }

    setUserName = userName => {
        this.setState({ userName: userName })
    }

    render() {
        console.log(this.state.userName);
        return (
            <div className="App">
                <header className="App-header">
                    <PreGame userName={this.state.userName} />
                 <RulesPop />
                    <UserStartPop
                        userName={this.state.userName}
                        setUserName={this.setUserName}
                    />

                </header>
            </div>
        );
    }
}

export default App;