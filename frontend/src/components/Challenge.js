import React, { Component } from 'react'

import { Modal, Image, CloseButton } from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Challenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false, 
          value: '',
          copied: false     
        };
      }
      handleShow = () => {
        this.setState({show: true});
      }
      handleClose = () => {
        this.setState({show: false});
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
            <input id="userName-input" type="text" value="word"/>
            {/* No onClick event */}
            <input id="userName-submit" type="submit" value="Submit"  />
            <div>
        <input value={this.state.value}
          onChange={({target: {value}}) => this.setState({value, copied: false})} />

        <CopyToClipboard text={this.state.value}
          onCopy={() => this.setState({copied: true})}>
          <span>Click to Copy</span>
        </CopyToClipboard>


        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
      </div>
                    </div>
                </Modal.Body>
            </Modal>
            
    </>
  )
}
}
export default Challenge