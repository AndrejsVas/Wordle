import React, { Component } from "react"

import GameGrid from "./GameGrid";
import Keyboard from "./Keyboard";

class MainGame extends Component {

    render() {

        const { setGridBoxRefs, setKeyboardButtonRefs, letters, guesses } = this.props;

        return (
            <>
                <GameGrid
                    setGridBoxRefs={setGridBoxRefs}
                    letters={letters}
                    guesses={guesses}
                />
                <Keyboard
                    setKeyboardButtonRefs={setKeyboardButtonRefs}
                />
            </>
        )
    }
}

export default MainGame;