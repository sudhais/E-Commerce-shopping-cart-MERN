import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { Button, Form } from 'react-bootstrap'
import { addShippingAddress } from '../reducers/cartSlice'

export default function ShippingPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user:userInfo} = useSelector((state) => state.user.userInfo)
  const {shippingAddress} = useSelector((state) => state.cart)

  const [formData, setFormData] = useState({
    address:shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country
  })

  // console.log(formData);

  useEffect(() => {
    if(!userInfo)
      navigate('/login')
  },[userInfo])

  const handleChange = (e) => {
    const {id,value} = e.target

    setFormData((prevState) => ({
      ...prevState,
      [id]:value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addShippingAddress(formData))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h3>Shipping</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='address' className='form-group'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter the address'
            required
            value={formData.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='city' className='form-group'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            required
            value={formData.city}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='postalCode' className='form-group'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            required
            value={formData.postalCode}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='country' className='form-group'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter the country'
            required
            value={formData.country}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}
