import React, { Component } from 'react'

import { Modal, Image, CloseButton, ModalDialog } from "react-bootstrap";
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Challenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            word: '',
            copied: false,
            showLink: false,
            link: window.location.href
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

    render() {
        return (
            <>
                <div onClick={this.handleShow}>Challenge link</div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header className="flex-row">
                        <Modal.Title>Challenge</Modal.Title>
                        <CloseButton variant="white" onClick={this.handleClose} />
                    </Modal.Header>
                    <Modal.Body >
                        <div>
                            <h1>Set your word:{console.log(window.location.href)}</h1>
                            <input value={this.state.word} onChange={({target: {word}}) => this.setState({word, copied: false})} />
                            <input type="submit" word="Submit" onClick={this.handleShowLink}/> <hr/>
                            {this.state.showLink ? <div>
                                Copy this link and send to your friends! <br/>

                                <CopyToClipboard text={this.state.link}
                                    onCopy={() => this.setState({ copied: true })}>
                                    <span>{this.state.link}</span>
                                </CopyToClipboard>


                                {this.state.copied ? <span style={{ color: 'red' }}> Copied.</span> : null}
                            </div> : null}
                        </div>
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}
export default Challenge