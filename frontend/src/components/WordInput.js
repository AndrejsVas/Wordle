import React from 'react';
import RICIBs from 'react-individual-character-input-boxes';

class WordInput extends React.Component {

    handleOutput(string) {
        // Do something with the string
    }

    render() {
        return (
            <div className="word-input">
                <RICIBs
                    amount={5}
                    handleOutputString={this.handleOutput}
                    inputRegExp={/^[a-z]$/}
                />
            </div>
        );
    }
}

export default WordInput;