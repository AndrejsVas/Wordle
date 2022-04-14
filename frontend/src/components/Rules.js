import React, { useState } from "react";

import { Modal, Image, CloseButton } from "react-bootstrap";

import gray from '../images/Gray.png';
import green from '../images/Green.png';
import yellow from '../images/Yellow.png';

function Rules({ setIsPopup }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div onClick={handleShow}>
                Rules
            </div>

            <Modal show={show} onHide={handleClose} onEnter={() => setIsPopup(true)} onExited={() => setIsPopup(false)}>
                <Modal.Header className="flex-row">
                    <Modal.Title>Rules</Modal.Title>
                    <CloseButton variant="white" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body >
                    <div>Guess 5-letter word in 6 attempts <br /> <hr />  {/*TODO rework rules. use html instead of img */}
                        <Image src={green} fluid alt="Green explanation" /> <br />
                        If the letter is highlighted as <b>GREEN</b>, the letter position is correct. <br /> <hr />
                        <Image src={yellow} fluid alt="Yellow explanation" /> <br />
                        If the letter is highlighted <b>YELLOW</b>, the letter is present in this word, but not in that position. <br /> <hr />
                        <Image src={gray} fluid alt="Gray explanation" /> <br />
                        If the letter is highlighted as <b>GRAY</b>, the letter does not exist in this word.
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default Rules