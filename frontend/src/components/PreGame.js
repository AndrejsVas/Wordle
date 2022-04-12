import React, { Component } from 'react'
import Game from './Game'

import 'bootstrap/dist/css/bootstrap.min.css'


class PreGame extends Component {

    

    handleGameStartButton = () => {
        if (this.props.isWin) {
            return 
        }
        if (this.props.gameStarted) {
            console.log("game state");
            return <Game userName={this.props.userName}
                        isWin={this.props.isWin}
                        setIsWin={this.props.setIsWin} />
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