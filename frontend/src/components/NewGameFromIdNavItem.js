import React, { useState } from "react";

import { Modal, CloseButton, InputGroup, FormControl, Button } from "react-bootstrap";


function NewGameFromIdNavItem({ setIsPopup }) {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    return (
        <>
            <div onClick={handleShow}>
                Game from ID
            </div>

            <Modal show={show} onHide={handleClose} onEnter={() => setIsPopup(true)} onExited={() => setIsPopup(false)}>
                <Modal.Header className="flex-row">
                    <Modal.Title>New game from ID</Modal.Title>
                    <CloseButton variant="white" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body >
                    <InputGroup>
                        <FormControl
                            placeholder='Challange ID:'
                            aria-label='Input challange ID'
                            type='number'
                            value={value}
                            onChange={handleChange}
                        />
                        <Button variant="outline-light" onClick={() => { window.open('/?challangeId=' + value, '_self') }}>
                            Load
                        </Button>
                    </InputGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default NewGameFromIdNavItem