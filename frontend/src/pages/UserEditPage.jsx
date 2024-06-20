import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Button, Form } from 'react-bootstrap';
import { userUpdateReset } from '../reducers/userSlice';
import { getUserDetails, updateUser } from '../actions/userThunk';

export default function UserEditPage() {
  const {id:userId} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading,error,details:user} = useSelector((state)=> state.user.userDetails)
  const {loading:loadingUpdate,error:errorUpdate,successUpdate} = useSelector((state)=> state.user.userUpdate)
  const [formData,setFormData] = useState( {
    name:'',
    email:'',
    isAdmin:false
  })


  useEffect(() => {
    if(successUpdate){
      dispatch(userUpdateReset())
      navigate('/admin/userlist')
    }else{

      
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setFormData({
          name:user.name,
          email:user.email,
          isAdmin:user.isAdmin
        })
      }
    }
  },[dispatch,navigate,userId,user,successUpdate])

  const handleChange = (e) => {
    const {id,value, type, checked} = e.target
    setFormData((preState)=> ({
      ...preState,
      [id]: type === 'checkbox'? checked : value
    }) )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser({id:userId,user:formData}))
  }

  const handleGoBack = () => {
    dispatch(userUpdateReset())
    navigate('/admin/userlist')
  }

  return (
    <>
      <Button onClick={handleGoBack} className='btn btn-light my-3'>
        Go back
      </Button>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant={'danger'}>{errorUpdate}</Message>}

        {loading ? (
          <Loader/>
        ): error ? (
          <Message variant={'danger'}>{error}</Message>
        ): (
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

            <Form.Group controlId='isAdmin' className='form-group'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={formData.isAdmin}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type='submit' variant='primary'>Update</Button>
          </Form>
        )}

      </FormContainer>
    </>
  )
}
