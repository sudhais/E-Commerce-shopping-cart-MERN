import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { Button, Col, Form } from 'react-bootstrap'
import { addPaymentMethod } from '../reducers/cartSlice'

export default function PaymentPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {shippingAddress} = useSelector((state) => state.cart)
  const {paymentMethod:method} = useSelector((state) => state.cart)

  const [paymentMethod, setPaymentMethod] = useState(method || 'PayPal')


  if(!shippingAddress)
    navigate('/shipping')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addPaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='form-group'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label= 'PayPal'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked = {paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type='radio'
              label= 'Credit Card'
              id='Credit Card'
              name='paymentMethod'
              value='CreditCard'
              checked = {paymentMethod === 'CreditCard'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}
