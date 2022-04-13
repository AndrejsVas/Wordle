import React, { Component } from "react"

import GameGrid from "./GameGrid";
import Keyboard from "./Keyboard";

class MainGame extends Component {
    state = {
        gridBoxRefs: []
    }

    setGridBoxRefs = (gridBoxRefs) => {
        if (gridBoxRefs !== this.state.gridBoxRefs) {
            this.setState({ gridBoxRefs: gridBoxRefs })
        }
    }

    render() {

        const { letters, guesses } = this.props;

        return (
            <>
                <GameGrid
                    setGridBoxRefs={this.setGridBoxRefs}
                    letters={letters}
                    guesses={guesses}
                />
                <Keyboard
                    gridBoxRefs={this.gridBoxRefs}
                />
            </>
        )
    }
}

export default MainGame;