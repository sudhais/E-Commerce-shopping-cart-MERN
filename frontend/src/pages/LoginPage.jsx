import React, {useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer';
import { Button, Form,Row,Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../reducers/userSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';

export default function LoginPage({location, history}) {

  const dispatch = useDispatch()
  const {userInfo,loading,error} = useSelector((state)=> state.user)
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')

  const navigate = useNavigate();

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  }, [userInfo,navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signIn({email,password}))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'  className='form-group'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            onChange={(e)=> setEmail(e.target.value)}

          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='form-group'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            onChange={(e)=> setPassword(e.target.value)}

          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?
          <Link to='/register'>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}