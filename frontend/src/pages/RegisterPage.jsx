import React from 'react'
import FormContainer from '../components/FormContainer';
import { Button, Form,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form >
        <Form.Group controlId='name' className='form-group'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'

          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className='form-group'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'

          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='form-group'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
  

          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword' className='form-group'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='confirm password'
  

          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account?
          <Link to='/login'>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
