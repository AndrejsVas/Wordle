import React, { Component } from "react";
import { Button } from "react-bootstrap";

import './Keyboard.css'

class Keyboard extends Component {

    render() {
        const { gridBoxRefs } = this.props
        return (
            <>
                <div className="keyboard font-monospace text-center" onClick={({ target: { innerHTML } }) => { console.log(innerHTML); }}>
                    <div className="first-row">
                        <Button variant="outline-light" className="keyboard-button">q</Button>
                        <Button variant="outline-light" className="keyboard-button">w</Button>
                        <Button variant="outline-light" className="keyboard-button">e</Button>
                        <Button variant="outline-light" className="keyboard-button">r</Button>
                        <Button variant="outline-light" className="keyboard-button">t</Button>
                        <Button variant="outline-light" className="keyboard-button">y</Button>
                        <Button variant="outline-light" className="keyboard-button">u</Button>
                        <Button variant="outline-light" className="keyboard-button">i</Button>
                        <Button variant="outline-light" className="keyboard-button">o</Button>
                        <Button variant="outline-light" className="keyboard-button">p</Button>
                    </div>
                    <div className="second-row">
                        <Button variant="outline-light" className="keyboard-button">a</Button>
                        <Button variant="outline-light" className="keyboard-button">s</Button>
                        <Button variant="outline-light" className="keyboard-button">d</Button>
                        <Button variant="outline-light" className="keyboard-button">f</Button>
                        <Button variant="outline-light" className="keyboard-button">g</Button>
                        <Button variant="outline-light" className="keyboard-button">h</Button>
                        <Button variant="outline-light" className="keyboard-button">j</Button>
                        <Button variant="outline-light" className="keyboard-button">k</Button>
                        <Button variant="outline-light" className="keyboard-button">l</Button>
                    </div>
                    <div className="third-row">
                        <Button variant="outline-light" className="keyboard-button del">Del</Button>
                        <Button variant="outline-light" className="keyboard-button">z</Button>
                        <Button variant="outline-light" className="keyboard-button">x</Button>
                        <Button variant="outline-light" className="keyboard-button">c</Button>
                        <Button variant="outline-light" className="keyboard-button">v</Button>
                        <Button variant="outline-light" className="keyboard-button">b</Button>
                        <Button variant="outline-light" className="keyboard-button">n</Button>
                        <Button variant="outline-light" className="keyboard-button">m</Button>
                        <Button variant="outline-light" className="keyboard-button enter">Enter</Button>
                    </div>
                </div>
            </>
        );
    }
}
export default Keyboard