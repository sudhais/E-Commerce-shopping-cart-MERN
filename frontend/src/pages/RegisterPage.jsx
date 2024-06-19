import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {signUp} from '../actions/userThunk'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const dispatch = useDispatch()
  const {user:userInfo,loading,error} = useSelector((state)=> state.user.userInfo)
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  }, [userInfo,navigate])

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      const {confirmPassword, ...user} = formData
      setFormData(initialState)
      dispatch(signUp(user))
    }
    
    };


  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='name' className='form-group'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={formData.name}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className='form-group'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={formData.email}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='form-group'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={formData.password}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword' className='form-group'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={formData.confirmPassword}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign Up
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account?{' '}
          <Link to='/login'>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}