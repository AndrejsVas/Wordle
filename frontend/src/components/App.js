import React, { Component } from 'react';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator'

import TopNav from './TopNav';
import Game from './Game'
import Endgame from './Endgame';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';



class App extends Component {

    componentDidMount = () => {
        let url = new URL(window.location.href)
        this.setState({ challangeId: url.searchParams.get('challangeId') })
    }

    genUserName = () => {
        return uniqueNamesGenerator({ dictionaries: [adjectives, animals], separator: '-' })
    }

    state = {
        userName: this.genUserName(),
        isPopup: false
    }

    setUserName = userName => {
        this.setState({ userName: userName })
    }

    render() {
        return (
            <div className="App">
                <TopNav
                    setIsPopup={isPopup => this.setState({ isPopup: isPopup })}
                    userName={this.state.userName}
                    setUserName={this.setUserName}
                    genUserName={this.genUserName}
                />
                <Game
                    isPopup={this.state.isPopup}
                    userName={this.state.userName}
                    challangeId={this.state.challangeId}
                />
                <Endgame />
            </div>
        );
    }
}

export default App;