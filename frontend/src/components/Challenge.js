import React, { useState } from 'react'

import { Modal, Image, CloseButton } from "react-bootstrap";

function Challenge() {
    const [show, setShow] = useState(false);
    const [showLink, setShowLink] = useState(false);

    // const handleShowLink = () => setShowLink(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <div onClick={handleShow}>Challenge link</div>
    <Modal show={show} onHide={handleClose}>
                <Modal.Header className="flex-row">
                    <Modal.Title>Challenge</Modal.Title>
                    <CloseButton variant="white" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body >
                    <div>
                    <h1>Set your word:{console.log(window.location.href)}</h1>
            <input id="userName-input" type="text" value="word"/>
            {/* No onClick event */}
            <input id="userName-submit" type="submit" value="Submit"  />
            <div className='link' show={showLink}>
                <h1>{window.location.href}</h1>
            </div>
                    </div>
                </Modal.Body>
            </Modal>
            
    </>
  )
}
export default Challenge