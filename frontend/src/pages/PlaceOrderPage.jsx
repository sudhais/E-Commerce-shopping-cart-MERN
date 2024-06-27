import React, { useEffect } from 'react'
import CheckOutSteps from '../components/CheckOutSteps'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link, useNavigate } from 'react-router-dom'
import { calculatePrice, cartReset } from '../reducers/cartSlice'
import { createOrder } from '../actions/orderThunk'
import { orderCreateReset } from '../reducers/orderSlice'

export default function PlaceOrderPage() {

  const {shippingAddress,paymentMethod,cartList,price} = useSelector((state) => state.cart)
  const {success,loading,error,order} = useSelector((state) => state.order.orderCreate)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(order);

  useEffect(() => {

    if(success){
      navigate(`/order/${order._id}`)
      dispatch(cartReset())
      dispatch(orderCreateReset())
    }
      

  } , [success])

  useEffect(() => {
    dispatch(calculatePrice())
  } , [cartList])

  const handlePlaceOrder = () => {

    const orderItems = cartList.map(({_id, ...rest}) => ({
      ...rest,
      product: _id
    }))

    const order = {
      orderItems, 
      shippingAddress,
      paymentMethod,
      itemsPrice:price.itemsPrice,
      shippingPrice: price.shippingPrice,
      taxPrice : price.taxPrice,
      totalPrice: price.totalPrice
    }
    dispatch(createOrder(order))
  }

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}{' '}
                {shippingAddress.postalCode},{' '}
                {shippingAddress.country}              
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Mehtod</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {loading && <Loader />}
              {cartList.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartList.map((item,index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image 
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}      
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items Price </Col>
                  <Col>${price.itemsPrice}</Col>
                </Row> 
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${price.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${price.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${price.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled= {cartList.length === 0}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
