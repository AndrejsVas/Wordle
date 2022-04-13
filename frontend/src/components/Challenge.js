import React, { useState } from 'react'

import { Modal, Image, CloseButton } from "react-bootstrap";

function Challenge() {
    const [show, setShow] = useState(false);

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
                    </div>
                </Modal.Body>
            </Modal>
            
    </>
  )
}
export default Challenge