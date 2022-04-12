import React, { Component } from 'react';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'

import PreGame from './components/PreGame';
import RulesPop from './components/RulesPop';
import UserStartPop from './components/UserStartPop';
import Endgame from './components/Endgame';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ChallengePop from './components/ChallengePop';


class App extends Component {

    state = {
        userName: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }),
        gameStarted: false,
        isWin: false
    }
    
    setIsWin = () => {
        this.setState({isWin: true});
    }

    gameStartState = () => {
        this.setState({ gameStarted: true });
     //   console.log("hello"+this.state.gameStarted);
    }

    setUserName = userName => {
        this.setState({ userName: userName })
    }

    render() {
        console.log(this.state.isWin);
        return (
            <div className="App">
                <div className="App-header">
                    <PreGame userName={this.state.userName}
                            gameStarted={this.state.gameStarted}
                            isWin={this.state.isWin}
                            setIsWin={this.setIsWin} />
                 <RulesPop />
                 <ChallengePop />
                 <Endgame
                    isWin={this.state.isWin}
                    userName={this.state.userName} />
                    <UserStartPop
                        userName={this.state.userName}
                        setUserName={this.setUserName}
                        gameStartState={this.gameStartState}
                    />

                </div>
            </div>
        );
    }
}

export default App;