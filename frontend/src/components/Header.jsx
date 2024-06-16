import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../reducers/userSlice';

export default function Header() {
  const {userInfo} = useSelector((state)=> state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutSuccess())
    navigate('/login')
  }

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
            {
              userInfo? (
                <NavDropdown title={userInfo.name} id='username'>
                  <Nav.Link as={Link} to='/'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Nav.Link>
                  <Nav.Link as={Link} to='/'>
                    <NavDropdown.Item
                      onClick={logoutHandler}
                    >Logout</NavDropdown.Item>
                  </Nav.Link>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              )
            }
            

          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}