import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { userUpdateReset } from '../reducers/userSlice'
import { getUserProfile, updateUserProfile } from '../actions/userThunk'
import { ListMyOrders } from '../actions/orderThunk'

export default function ProfilePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {loading,error,details:user} = useSelector((state)=> state.user.userDetails)
  const {user:userInfo} = useSelector((state)=> state.user.userInfo)
  const {loading:loadingUpdate,error:errorUpdate,successUpdate} = useSelector((state)=> state.user.userUpdate)
  const {loading:loadingOrder,error:errorOrder,list:orders} = useSelector((state)=> state.order.orderMyList)

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

    if(!user || !user.name){
      dispatch(getUserProfile())
      dispatch(ListMyOrders())
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
      },7000)
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

      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrder ? (
          <Loader/>
        ) : errorOrder ? (
          <Message variant='danger'>{errorOrder}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0,10)
                    ) : (
                      <i className='fas fa-times' style={{color:'red'}}/>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0,10)
                    ): (
                      <i className='fas fa-times' style={{color:'red'}}/>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}?profile=true`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}
