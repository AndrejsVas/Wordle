import React from 'react';
import RICIBs from 'react-individual-character-input-boxes';
import 'bootstrap/dist/css/bootstrap.min.css'

class WordInput extends React.Component {


    state = {
        isSent: false,
        charState: Array(this.props.wordLength),
        propsForWord: Array(this.props.wordLength * 1).fill(this.getPropsForChar())
    };

    handleOutput(string) {
        this.setState({ ... this.state, string: string });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.setState({ ...this.state, isSent: true })
            const wordGuess = this.state.string;
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
                        charState: data.charState
                    })).then(() => {
                        if (this.state.isWord) {
                            console.log("it's a word");
                            //TODO show result, change focus
                        } else {
                            this.setState({ ...this.state, isSent: false })
                            console.log("it's not a word");
                            //TODO blink not word
                        }
                    })
            } else {
                this.setState({ ...this.state, isSent: false })
                console.log("it's too short");
                //TODO blink too short
            }
        }
    }

    getPropsForChar(color = "withe") {
        return { style: { backgroundColor: color } }
    }

    render() {
        return (
            <div className="word-input">
                <fieldset
                    onKeyDown={this.handleKeyDown.bind(this)}
                    disabled={this.state.isSent}
                >   
                    <RICIBs
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