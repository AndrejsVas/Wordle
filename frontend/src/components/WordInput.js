import React from 'react';
import RICIBs from 'react-individual-character-input-boxes';
import 'bootstrap/dist/css/bootstrap.min.css'

class WordInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isDisabled: false };
    }

    handleOutput(string) {
        console.log(string);
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            console.log('do validate');
            if (!this.state.isDisabled) {
                this.setState({ isDisabled: true });
            }
        }
    }

    render() {
        return (
            <div className="word-input">
                <fieldset
                    onKeyDown={this.handleKeyDown.bind(this)}
                    disabled={this.state.isDisabled}
                >   
                    <RICIBs
                        amount={5}
                        handleOutputString={this.handleOutput}
                        inputProps={[
                            {},
                            { style: { class: "form-control" } },
                            {}
                        ]}
                        inputRegExp={/^[a-z]$/}
                    />
                    {this.state.test}
                </fieldset>
            </div>
        );
    }
}

export default WordInput;