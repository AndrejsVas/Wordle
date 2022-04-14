import React, { Component } from "react"

import GameGrid from "./GameGrid";
import Keyboard from "./Keyboard";

class MainGame extends Component {

    render() {
        window.addEventListener('keyup', this.props.handleKeyUp)

        return (
            <>
                <GameGrid
                    setGridBoxRefs={this.props.setGridBoxRefs}
                    letters={this.props.letters}
                    guesses={this.props.guesses}
                />
                <Keyboard
                    setKeyboardButtonRefs={this.props.setKeyboardButtonRefs}
                    handleOnClick={this.props.handleOnClick}
                />
            </>
        )
    }
}

export default MainGame;