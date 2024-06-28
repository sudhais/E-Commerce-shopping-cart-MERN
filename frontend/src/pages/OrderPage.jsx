import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deliverOrder, orderDetailsThunk, payOrder } from '../actions/orderThunk'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js'
import { orderDeliverReset, orderPayReset } from '../reducers/orderSlice'

export default function OrderPage() {

  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user:userInfo} = useSelector((state) => state.user.userInfo)
  const {details:order, loading, error} = useSelector((state) => state.order.orderDetails) 
  const {loading:loadingPay, error:errorPay, success:successPay} = useSelector((state) => state.order.orderPay)
  const {loading:loadingDeliver, success:successDeliver, error:errorDeliver} = useSelector((state) => state.order.orderDeliver)
  const clientId = import.meta.env.VITE_CLIENT_ID
  const [sdkReady, setSdkReady] = useState(false)

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  useEffect(() => {
    
    if(!userInfo)
      navigate('/login')

    const addPayPalScript = async () => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if(!order || successPay || order._id !== id || successDeliver){
      dispatch(orderDetailsThunk(id))
      dispatch(orderPayReset())
      dispatch(orderDeliverReset())
    }else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }

  } , [dispatch,successPay,order,id, userInfo,successDeliver])

  const successPaymentHandler = (paymentResult) => {
    // console.log(paymentResult);
    dispatch(payOrder({id,paymentResult}))
  }

  const handleDeliver = () => {
    dispatch(deliverOrder(id))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode}, {' '}
                {order.shippingAddress.country}
              </p>
              <span>
                {order.isDelivered ? (
                  <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </span>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item,index) => (
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
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
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
                  <Col>${order.itemsPrice}</Col>
                </Row> 
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader/>}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalScriptProvider options={initialOptions}>
                      <PayPalButtons
                        createOrder={(data,actions) => {
                          return actions.order.create({
                            purchase_units: [{
                              amount : {
                                value: order.totalPrice
                              },
                            }],
                          });
                        }}
                        onApprove={(data,actions) => {
                          return actions.order.capture().then((details) => {
                            successPaymentHandler(details)
                          })
                        }}
                      /> 
                    </PayPalScriptProvider>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader/>}
              {userInfo && 
                userInfo.isAdmin &&
                order.isPaid && 
                !order.isDelivered && (
                  <ListGroup.Item>
                    {errorDeliver && <Message variant='danger'>{errorDeliver}</Message>}
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={handleDeliver}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
