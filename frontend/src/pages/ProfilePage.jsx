import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { userUpdateReset } from '../reducers/userSlice'
import { getUserProfile, updateUserProfile } from '../actions/userThunk'

export default function ProfilePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {loading,error,details:user} = useSelector((state)=> state.user.userDetails)
  const {user:userInfo} = useSelector((state)=> state.user.userInfo)
  const {loading:loadingUpdate,error:errorUpdate,successUpdate} = useSelector((state)=> state.user.userUpdate)

  const [message,setMessage] = useState(null)
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    password:'',
    confirmPassword:''
  })


  useEffect(() => {

    if(!userInfo){
      navigate('/login')
    }

    // if(success){
    //   dispatch(userUpdateReset())
    // }

    if(!user || !user.name){
      
      dispatch(getUserProfile())
      // dispatch()
      }else{
        // dispatch()
    }

    setFormData((prev) => ({
      ...prev,
      name:user.name,
      email: user.email
    }))


  } ,[userInfo,user])

  useEffect(() => {

    if(successUpdate) {
      const timer = setTimeout(() => {
        dispatch(userUpdateReset())
      },10000)
      return () => clearTimeout(timer)
    }

  }, [successUpdate])

  const handleChange = (e) => {
    const {id,value} = e.target
    setFormData((prev) => ({
      ...prev,
      [id]:value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(formData.password !== formData.confirmPassword){
      setMessage("password does not match")
    }else{
      dispatch(updateUserProfile({formData}))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {successUpdate && <Message variant='success'>Profile Updated</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading && <Loader/>}
        {loadingUpdate && <Loader/>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='name' className='form-group'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId='email' className='form-group'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId='password' className='form-group'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId='confirmPassword' className='form-group'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type='submit' variant='primary'>Update</Button>
        </Form>
      </Col>
    </Row>
  )
}
