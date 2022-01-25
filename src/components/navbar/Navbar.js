import React, { Component } from 'react';
//import "./Navbar.css"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown';
//import { Switch, Route, Link } from 'react-router-dom';

//Navbar code
class Navigation extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" sticky="top" >
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}


export default Navigation;




// const Navbar = () => {
//     return (
//         <header class="header">
//             <div class="mid">
//                 <ul class="navbar">
//                     <li>
//                         <button>Section 1</button>
//                     </li>
//                     <li>
//                         <button>Section 2</button>
//                     </li>
//                     <li>
//                         <button>Section 3</button>
//                     </li>
//                     <li>
//                         <button>Section 4</button>
//                     </li>
//                 </ul>

//             </div>

//         </header>
//     );
// }