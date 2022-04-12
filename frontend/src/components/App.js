import React, { Component } from 'react';

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator'

import PreGame from './PreGame';
import RulesPop from './RulesPop';
import UserStartPop from './UserStartPop';

import Example from './Example';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Rules from './Rules';


class App extends Component {

    // state = {
    //     userName: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })
    // }

    genUserName = () => {
        return uniqueNamesGenerator({ dictionaries: [adjectives, animals], separator: '-' })
    }

    setUserName = userName => {
        this.setState({ userName: userName })
    }


    render() {
        return (
            <div className="App">
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand >Not Wordle</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link >Start new game</Nav.Link>
                                <Nav.Link >Create challenge</Nav.Link>
                                <Nav.Link ><Rules /></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>




                {/* <header className="App-header">
                    <PreGame userName={this.state.userName} />
                 <RulesPop />
                    <UserStartPop
                        userName={this.state.userName}
                        setUserName={this.setUserName}
                    />

                </header> */}
            </div>
        );
    }
}

export default App;