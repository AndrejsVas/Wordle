import React, { Component } from 'react'

import { Modal, CloseButton, InputGroup, FormControl, Button } from "react-bootstrap";
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Challenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            link: window.location.href,
            value: '',
            challangeId: ''
        };
    }
    handleShow = () => {
        this.setState({ show: true });
    }
    handleClose = () => {
        this.setState({ show: false });
    }
    handleShowLink = () => {
        this.setState({showLink: true});
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    genWord = () => {
        if (this.state.isLoading) return
        this.setState({ isLoading: true })
        fetch('/api/word/getRandomWord')
            .then(response => response.text())
            .then(word => {
                this.setState({ value: word, isLoading: false })
            })
    }

    createChallenge = () => {
        if (this.state.isLoading || this.state.value.length !== 5) return
        this.setState({ isLoading: true })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wordToGuess: this.state.value })
        };
        fetch('/api/multiplayerGame/pickAWord', requestOptions)
            .then(response => response.json())
            .then(id => {
                this.setState({ challangeId: id, isLoading: false })
            })
    }

    render() {
        return (
            <>
                <div onClick={this.handleShow}>Create link</div>

                <Modal show={this.state.show} onHide={this.handleClose} onEnter={() => this.props.setIsPopup(true)} onExited={() => this.props.setIsPopup(false)}>
                    <Modal.Header className="flex-row">
                        <Modal.Title>Create challenge game</Modal.Title>
                        <CloseButton variant="white" onClick={this.handleClose} />
                    </Modal.Header>
                    <Modal.Body >
                        <InputGroup>
                            <FormControl
                                disabled={this.state.isLoading}
                                placeholder='Your word:'
                                aria-label='Word for challange'
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <Button disabled={this.state.isLoading} variant="outline-light" onClick={this.genWord}>
                                Random
                            </Button>
                            <Button disabled={this.state.isLoading} variant="outline-light" onClick={this.createChallenge}>
                                Generate
                            </Button>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <>{this.state.challangeId !== '' ? 'Challange ID: ' + this.state.challangeId : ''}</>
                        <CopyToClipboard text={this.state.link + '?challangeId=' + this.state.challangeId}>
                            <Button variant="outline-light">Copy link</Button>
                        </CopyToClipboard>

                        <CopyToClipboard text={this.state.challangeId}>
                            <Button variant="outline-light">Copy ID</Button>
                        </CopyToClipboard>
                    </Modal.Footer>
                </Modal>

            </>
        )
    }
}
export default Challenge