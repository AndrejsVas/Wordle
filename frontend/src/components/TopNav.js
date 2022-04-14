import React from 'react';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import Challenge from './Challenge';
import NewGameFromIdNavItem from './NewGameFromIdNavItem';
import Rules from './Rules';
import UserName from './UserName';


function TopNav({ userName, setUserName, genUserName, setIsPopup }) {
    return (
        <div className='top-navbar-fixed-top-with-spacer'>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className='flex-row justify-content-around' >
            <Container>
                <Navbar.Brand >Not Wordle</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                            <Nav.Link href='/' >New game</Nav.Link>
                            <Nav.Link><NewGameFromIdNavItem setIsPopup={setIsPopup} /></Nav.Link>
                            <Nav.Link ><Challenge setIsPopup={setIsPopup} /></Nav.Link>
                            <Nav.Link ><Rules setIsPopup={setIsPopup} /></Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>  {/* TODO call it on first visit (no cookies) (implement cookies first) */}
                            <UserName
                                    setIsPopup={setIsPopup}
                                userName={userName}
                                setUserName={setUserName}
                                genUserName={genUserName}
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <Navbar className='navbar-spacer'><Navbar.Brand >Spacer</Navbar.Brand></Navbar>
        </div>
    );
}

export default TopNav;