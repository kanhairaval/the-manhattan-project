import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
            <>
            <Nav.Link href="/questions">Personal Calculator</Nav.Link>
            </>
            ) : (
              <>
              </>
            )}

            <NavDropdown title="Secret Stuff" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/about">About</NavDropdown.Item>
              <NavDropdown.Item href="/developments">
                Future Developments
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Make a difference</NavDropdown.Item>
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
            <Nav.Link eventKey={2} href="/donate">Donate!
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;