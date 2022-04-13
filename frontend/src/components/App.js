import React, { Component } from 'react';

import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator'

import TopNav from './TopNav';
import Game from './Game'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';


class App extends Component {

    genUserName = () => {
        return uniqueNamesGenerator({ dictionaries: [adjectives, animals], separator: '-' })
    }

    state = {
        userName: this.genUserName()
    }


    setUserName = userName => {
        this.setState({ userName: userName })
    }


    render() {
        const { userName } = this.state
        return (
            <div className="App">
                <TopNav
                    userName={userName}
                    setUserName={this.setUserName}
                    genUserName={this.genUserName}
                />
                <Game
                    userName={userName} 
                />
            </div>
        );
    }
}

export default App;