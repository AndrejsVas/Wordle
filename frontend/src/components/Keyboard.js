import React, { Component } from "react";
import { Button } from "react-bootstrap";

import './Keyboard.css'

class Keyboard extends Component {

    createRef = name => el => {
        if (!el) return
        this.props.setKeyboardButtonRefs(name, el)
    }

    handleOnClick = ({ target: { textContent } }) => {
        // if (!target.classList.contains("keyboard-button")) {
        //     return
        // }
        // let key = target.textContent

        // if (key === "Del") {
        //     key = "Backspace"
        // }

        // document.dispatchEvent(new KeyboardEvent("keyup", { 'key': key }))
    }

    render() {
        return (
            <>
                <div className="keyboard font-monospace text-center" onClick={this.handleOnClick}>
                    <div className="first-row">
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('q')}>q</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('w')}>w</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('e')}>e</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('r')}>r</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('t')}>t</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('y')}>y</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('u')}>u</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('i')}>i</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('o')}>o</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('p')}>p</Button>
                    </div>
                    <div className="second-row">
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('a')}>a</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('s')}>s</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('d')}>d</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('f')}>f</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('g')}>g</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('h')}>h</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('j')}>j</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('k')}>k</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('l')}>l</Button>
                    </div>
                    <div className="third-row">
                        <Button variant="outline-light" className="keyboard-button del">Del</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('z')}>z</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('x')}>x</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('c')}>c</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('v')}>v</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('b')}>b</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('n')}>n</Button>
                        <Button variant="outline-light" className="keyboard-button" ref={this.createRef('m')}>m</Button>
                        <Button variant="outline-light" className="keyboard-button enter">Enter</Button>
                    </div>
                </div>
            </>
        );
    }
}
export default Keyboard