import React from 'react';
import RICIBs from 'react-individual-character-input-boxes';
import 'bootstrap/dist/css/bootstrap.min.css'

class WordInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSent: false,
            wordLenght: 5
        };
    }

    handleOutput(string) {
        this.setState({ ... this.state, string: string });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.setState({ ...this.state, isSent: true })
            const wordGuess = this.state.string;
            if (wordGuess.length === this.state.wordLenght) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: this.state.id, word: wordGuess })
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

    render() {
        return (
            <div className="word-input">
                <fieldset
                    onKeyDown={this.handleKeyDown.bind(this)}
                    disabled={this.state.isSent}
                >   
                    <RICIBs
                        amount={this.state.wordLenght}
                        handleOutputString={this.handleOutput.bind(this)}
                        // inputProps={[{},{},{},{},{}]}
                        inputRegExp={/^[a-z]$/}
                    />
                    {this.state.test}
                </fieldset>
            </div>
        );
    }
}

export default WordInput;