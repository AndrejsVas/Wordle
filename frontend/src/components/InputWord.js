import React, { Component } from 'react'
import InputBox from './InputBox'

class InputWord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characterArray: Array(props.wordLength).fill(null),
            charStatus: Array(props.wordLength).fill(0),
            isSending: false,
            isGuessingDone: false,
            isWordDenied: false,
            isReadOnly: false
        }

        this.answer = ''
        this.isFirstFocus = true
        this.inputElements = {}
    }

    componentDidUpdate() {
        if (this.props.isActive && this.isFirstFocus) {
            this.inputElements['input0'].focus()
            this.isFirstFocus = false
        }
    }

    renderItems() {
        const { charStatus, isWordDenied, isReadOnly } = this.state;
        const { wordLength, isActive } = this.props

        let items = []

        for (var i = 0; i < wordLength; i++) {
            items.push(
                <InputBox
                    isActive={isActive}
                    charStatus={charStatus[i]}
                    isWordDenied={isWordDenied}
                    isReadOnly={isReadOnly || !isActive}
                    key={i}
                    name={'input' + i}
                    handleKeyDown={this.handleKeyDown}
                    handleChange={this.handleChange}
                    handleFocus={this.handleFocus}
                    inputRef={el => {
                        if (!el) return
                        this.inputElements[el.name] = el
                    }}
                />
            )
        }

        return items
    }

    render() {
        return (
            <div>{this.renderItems()}</div>
        )
    }

    handleChange = ({ target }) => {
        if (target.value.match(/^[A-Z]$/)) {
            this.focusNextChar(target)
            this.setModuleOutput(target)
        } else if (target.value.match(/^[a-z]$/)) {
            target.value = target.value.toUpperCase()
            this.focusNextChar(target)
            this.setModuleOutput(target)
        } else {
            target.value = this.state.characterArray[target.name.replace('input', '')]
        }
    }

    handleKeyDown = ({ target, key }) => {
        if (!this.state.isReadOnly && this.props.isActive) {

            if (key === 'Enter') {
                this.sendAnswer()
            } else if (key === 'Backspace') {
                if (target.value === '' && target.previousElementSibling !== null) {
                    target.previousElementSibling.value = ''
                    this.focusPrevChar(target)
                } else {
                    target.value = ''
                }
                this.setModuleOutput(target)
            } else if (key === 'ArrowLeft') {
                this.focusPrevChar(target)
            } else if (key === 'ArrowRight' || key === ' ') {
                this.focusNextChar(target)
            }
        }
    }
 
    sendAnswer = async () => {
        this.setState({ isSending: true, isReadOnly: true })
        const wordGuess = this.answer.toLowerCase();
        if (wordGuess.length === this.props.wordLength) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: this.props.gameId, word: wordGuess })
            };
            await fetch('/api/guess', requestOptions)
                .then(response => response.json())
                .then(data => {this.setState({
                    isWord: data.word,                   
                    charStatus: data.win ? Array(this.props.wordLength * 1).fill(3) : data.charStatus
                })
                if(data.win){
                    this.props.setIsWin();
                }    
            })
            if (this.state.isWord) {
                this.wordAccepted();               
                if (this.props.isWin) {
                    this.props.setActiveInput();
                }
            } else {
                this.wordDenied();
            }
        } else {
            this.wordDenied();
        }
    }

    wordAccepted = () => {
        this.setState({ isGuessingDone: true, isSending: false });
        this.setState(prevState => { return { isReadOnly: prevState.isSending || prevState.isGuessingDone } });
        this.props.onUpdateCharList(this.answer, this.state.charStatus);
        this.props.onNextInput();
    };

    wordDenied = () => {
        this.setState({ isWordDenied: true })
        setTimeout(() => {
            this.setState({ isWordDenied: false, isSending: false, isReadOnly: false })
        }, 500)
    }

    handleFocus = ({ target }) => {
        if (this.props.isActive && this.isFirstFocus) {
            target.parentElement.firstElementChild.focus()
            this.isFirstFocus = false
        } else if (!this.props.isActive && this.isFirstFocus) {
            target.parentElement.firstElementChild.focus()
        }
    }

    focusPrevChar = target => {
        if (target.previousElementSibling !== null) {
            target.previousElementSibling.focus()
        }
    }

    focusNextChar = target => {
        if (target.nextElementSibling !== null) {
            target.nextElementSibling.focus()
        }
    }

    setModuleOutput = () => {
        this.setState(prevState => {
            let updatedCharacters = prevState.characterArray.map((character, number) => {
                return this.inputElements['input' + number].value
            })
            this.answer = updatedCharacters.join('');
            return { characterArray: updatedCharacters }
        })
    }
}

export default InputWord;
