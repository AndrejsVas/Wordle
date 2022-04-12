import React from 'react';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import Rules from './Rules';
import UserName from './UserName';


function TopNav({ userName, setUserName, genUserName }) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className='flex-row justify-content-around' >
            <Container>
                <Navbar.Brand >Not Wordle</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link >Start new game</Nav.Link>
                        <Nav.Link >Create challenge</Nav.Link>
                        <Nav.Link ><Rules /></Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>  {/* TODO call it on first visit (no cookies) (implement cookies first) */}
                            <UserName
                                userName={userName}
                                setUserName={setUserName}
                                genUserName={genUserName}
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNav;