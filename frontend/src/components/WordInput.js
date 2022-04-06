import React from 'react';
// import RICIBs from 'react-individual-character-input-boxes';
import RICIBs from './ReactIndividualCharacterInputBoxes';
import 'bootstrap/dist/css/bootstrap.min.css'

class WordInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isSent: false,
            charStatus: Array(this.props.wordLength * 1).fill(0),
            propsForWord: Array(this.props.wordLength * 1).fill(this.defPropsForChar())
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.wordAccepted = this.wordAccepted.bind(this);
        this.badWord = this.badWord.bind(this);
    };

    handleOutput(string) {
        this.setState({ ... this.state, string: string });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.setState({ ...this.state, isSent: true })
            const wordGuess = this.state.string.toLowerCase();
            if (wordGuess.length == this.props.wordLength) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: this.props.gameId, word: wordGuess })
                };
                fetch('/api/guess', requestOptions)
                    .then(response => response.json())
                    .then(data => this.setState({
                        ...this.state,
                        isWord: data.word,
                        isWin: data.win,
                        charStatus: data.win ? Array(this.props.wordLength * 1).fill(3) : data.charStatus
                    })).then(() => {
                        if (this.state.isWord) {
                            console.log("it's a word");
                            // console.log(this.state.charStatus);
                            this.wordAccepted();
                            if (this.state.isWin) {
                                console.log("You win!");
                                //TODO wictory
                            }
                        } else {
                            this.setState({ ...this.state, isSent: false })
                            console.log("it's not a word");
                            this.badWord();
                        }
                    })
            } else {
                this.setState({ ...this.state, isSent: false })
                console.log("it's too short");
                this.badWord();
            }
        }
    }

    defPropsForChar(color = "withe") {
        return {
            charStatus: 0,
            readOnly: false,
            badWord: false
        }
    }

    wordAccepted() {
        var items = this.state.propsForWord;
        for (let i = 0; i < this.props.wordLength * 1; i++) {
            var item = { ...items[1], charStatus: this.state.charStatus[i], readOnly: true, badWord: false };
            items[i] = item;
        }
        this.setState({ ...this.state, propsForWord: items })
    }

    badWord() {
        var items = this.state.propsForWord;
        for (let i = 0; i < this.props.wordLength * 1; i++) {
            var item = { ...items[1], badWord: true };
            items[i] = item;
        }
        this.setState({ ...this.state, propsForWord: items })
    }

    render() {
        return (
            <div className="word-input">
                <fieldset
                    onKeyDown={this.handleKeyDown.bind(this)}
                    editable={this.state.isSent.toString()}
                >   
                    <RICIBs
                        editable="false"
                        amount={this.state.wordLength}
                        handleOutputString={this.handleOutput.bind(this)}
                        inputProps={this.state.propsForWord}
                        inputRegExp={/^[a-z]$/}
                    />
                    {this.state.test}
                </fieldset>
            </div>
        );
    }
}

export default WordInput;