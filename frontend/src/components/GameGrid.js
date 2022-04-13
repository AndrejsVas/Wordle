import React, { Component } from "react"

import './GameGrid.css'

class GameGrid extends Component {

    // ({ setGridBoxRefs, letters, guesses })

    gridBoxRefs = []

    shouldComponentUpdate(prevState) {
        return true
    }

    renderGrid = () => {

        const { setGridBoxRefs, letters, guesses } = this.props

        let grid = []
        let gridBoxRefs = []

        for (let row = 0; row < guesses; row++) {
            let rowItem = []
            let rowRefs = []
            for (let box = 0; box < letters; box++) {
                rowItem.push(
                    <div
                        className='letter-box'
                        key={box}
                        ref={el => {
                            if (!el) return
                            rowRefs[box] = el
                        }}
                    />
                )
            }
            grid.push(
                <div className='letter-row' key={row}>{rowItem}</div>
            )
            gridBoxRefs.push(rowRefs)
        }
        this.gridBoxRefs = gridBoxRefs

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
        console.log(this.gridBoxRefs);
        return <>{this.renderGrid()}</>
    }
}

export default GameGrid;