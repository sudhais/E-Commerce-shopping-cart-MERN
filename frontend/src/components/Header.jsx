import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { Link, Route, Routes } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <Nav.Link as={Link} to='/'>
            <Navbar.Brand>E-commerce Shopping Cart</Navbar.Brand>
          </Nav.Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Routes>
              <Route render={({ history }) => <SearchBox history={history} />} />
            </Routes> */}
            <SearchBox/>
          
          <Nav className="ml-auto">

            <Nav.Link as={Link} to='/' >
              <i className="fas fa-shopping-cart"></i>Cart
            </Nav.Link>

            <Nav.Link as={Link} to='/login'>
              <i className="fas fa-user"></i>Sign In
            </Nav.Link>

          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}