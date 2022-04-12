import React, { useState } from "react";

import { Modal, CloseButton, InputGroup, FormControl, Button } from "react-bootstrap";

function Username({ userName, setUserName, genUserName }) {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('')
    const [showHint, setShowHint] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setShowHint(false)
    }

    const handleSave = () => {
        if (value.length >= 8) {
            setUserName(value)
            handleClose()
        } else {
            setShowHint(true)
        }
    }

    const userNameHint = () => {
        if (showHint) {
            return <div style={{ color: 'red' }}>Minimum length: 8 letters</div>
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(value)
    }


    return (
        <>
            <div onClick={handleShow}>
                <sub>UserName: </sub>{userName}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="flex-row">
                    <Modal.Title>UserName</Modal.Title>
                    <CloseButton variant="white" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body >
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder={userName}
                            aria-label="UserName"
                            value={value}
                            onChange={handleChange}
                        />
                        <Button variant="outline-light" onClick={() => { setValue(genUserName()) }}>
                            Randomize
                        </Button>
                    </InputGroup>
                    {userNameHint()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default Username