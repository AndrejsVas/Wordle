import React, { Component } from "react"

import './GameGrid.css'

class GameGrid extends Component {

    // ({ setGridBoxRefs, letters, guesses })

    shouldComponentUpdate(prevState) {
        return true
    }

    gridBoxRefs = [[], [], [], [], [], []]

    renderGrid = () => {

        const { setGridBoxRefs, letters, guesses } = this.props

        let grid = []

        for (let row = 0; row < guesses; row++) {
            let rowItem = []
            for (let box = 0; box < letters; box++) {
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
        setGridBoxRefs(this.gridBoxRefs)

        return (
            <div className='game-grid'>
                <style type="text/css">
                    {`
                    .game-grid, .game-grid * {
                        --word-length: ${letters};
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