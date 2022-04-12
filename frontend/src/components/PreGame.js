import React, { Component } from 'react'
import Game from './Game'

import 'bootstrap/dist/css/bootstrap.min.css'


class PreGame extends Component {

    

    handleGameStartButton = () => {

        if (this.props.gameStarted) {
            console.log("game state");
            return <Game userName={this.props.userName} />
        }
    }

    render() {
        return (
            <div className="pre-game">
                {this.handleGameStartButton()}
            </div>
        );
    };
};

export default PreGame;