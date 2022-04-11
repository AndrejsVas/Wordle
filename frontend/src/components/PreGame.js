import React, { Component } from 'react'
import Game from './Game'

import 'bootstrap/dist/css/bootstrap.min.css'


class PreGame extends Component {

    state = {
        gameStarted: false
    }

    handleGameStartButton = () => {

        if (this.state.gameStarted) {
            return <Game userName={this.props.userName} />
        }
        return <button onClick={() => { this.setState({ gameStarted: true }) }} className='button'> Start </button>
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