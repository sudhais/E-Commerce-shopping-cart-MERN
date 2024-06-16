import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import SearchBox from './SearchBox';

export default function Header() {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <Nav.Link to='/'>
            <Navbar.Brand>E-commerce Shopping Cart</Navbar.Brand>
          </Nav.Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
          </Navbar.Collapse>
          
          <Nav.Link to='/' >
          <i className="fas fa-shopping-cart"></i>Cart
          </Nav.Link>

          <Nav.Link to='/'>
            <i className="fas fa-user"></i>Sign In
          </Nav.Link>
        </Container>
      </Navbar>
    </header>
  );
}