import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'react-router-dom';
import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Auth from '../utils/auth';

function Header() {
    const logout= (e) => {
      e.preventDefault();
      Auth.logout();
      window.location.href = '/home';
    };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="home">Earthify</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {Auth.loggedIn() ? (
              <Nav.Link href="/questions">Personal Calculator</Nav.Link>
            ) : (
              <>
              </>
            )}
            
            <NavDropdown title="Resources" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/about">About</NavDropdown.Item>
              {Auth.loggedIn() ? (
                <NavDropdown.Item href="/questions">Personal Calculator</NavDropdown.Item>
              ) : (
                <NavDropdown.Item href="/login">Personal Calculator</NavDropdown.Item>
              )}

              {Auth.loggedIn() ? (
                <NavDropdown.Item href="/donate">Donate!</NavDropdown.Item>
              ) : (
                <NavDropdown.Item href="/login">Donate!</NavDropdown.Item>
              )}
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Nav>
            {Auth.loggedIn() ? (
              <>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/home" onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
              <Nav.Link href="/login">Log In</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;