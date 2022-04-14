import React, { Component } from "react"

import './GameGrid.css'

class GameGrid extends Component {

    // ({ setGridBoxRefs, letters, guesses })

    shouldComponentUpdate(prevState) {
        return true
    }

    gridBoxRefs = [[], [], [], [], [], []]

    renderGrid = () => {

        let grid = []

        for (let row = 0; row < this.props.guesses; row++) {
            let rowItem = []
            for (let box = 0; box < this.props.letters; box++) {
                rowItem.push(
                    <div
                        className='letter-box'
                        key={box}
                        ref={el => {
                            if (!el) return
                            this.gridBoxRefs[row][box] = el
                        }}
                    />
                )
            }
            grid.push(
                <div className='letter-row' key={row}>{rowItem}</div>
            )
        }
        this.props.setGridBoxRefs(this.gridBoxRefs)

        return (
            <div className='game-grid'>
                <style type="text/css">
                    {`
                    .game-grid, .game-grid * {
                        --word-length: ${this.props.letters};
                    }
                `}
                </style>
                {grid}
            </div>
        )
    }

    render() {
        return <>{this.renderGrid()}</>
    }
}

export default GameGrid;