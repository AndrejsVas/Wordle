import React, { Component } from "react";
import InputWord from './InputWord';
import 'bootstrap/dist/css/bootstrap.min.css'


class GameGrid extends Component {

    state = { activeInput: 0 };

    handleNextInput = () => {
        this.setState(prevState => { return { activeInput: prevState.activeInput + 1 } })
    }

    setActiveInput = () => {
        this.setState({activeInput: -1})
    }

    renderItems() {
        const { attempts, wordLength, onUpdateCharList } = this.props

        let items = []

        for (var i = 0; i < attempts; i++) {
            items.push(
                <InputWord
                    wordLength={wordLength}
                    gameId={this.props.gameId}
                    isActive={this.state.activeInput === i}
                    onNextInput={this.handleNextInput}
                    onUpdateCharList={onUpdateCharList}
                    key={i}
                    name={'inputWord' + i}
                    setActiveInput={this.setActiveInput}
                    isWin={this.props.isWin}
                    setIsWin={this.props.setIsWin}
                // inputRef={el => {
                //     if (!el) return
                //     this.inputElements[el.name] = el
                // }}
                />
            )
        }

        return items
    }

    render() {
        return (
            <div className="game-grid">{this.renderItems()}</div>
        );
    }
}

export default GameGrid;

