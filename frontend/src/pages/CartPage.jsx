import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { proDetails } from '../actions/productThunk'
import { addQty, addToCart, removeCart } from '../reducers/cartSlice'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import Message from '../components/Message'

export default function CartPage() {
  const {id, qty} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {cartList} = useSelector((state) => state.cart)
  const {details:product} = useSelector((state) => state.product.productDetails)

  // console.log(cartList);

  useEffect(() => {

    if(id && qty) { 
      if(product.name){
        const cart = {
          _id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty: Number(qty)
        }
        dispatch(addToCart(cart))
      }
    }

  }, [id])

  const handleCartDelete = (id) => {
    dispatch(removeCart(id))
  }

  const handleCheckOut = () => {
    navigate('/')
  }

  return (
    <Row >
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartList.length === 0 ? (
          <Message>
            Your cart is empty <Link to={'/'}>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush' >
            {cartList.map((list) => (
              <ListGroup.Item key={list._id}>
                <Row>
                  <Col md={2}>
                    <Image src={list.image} alt={list.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${list._id}`}>{list.name}</Link>
                  </Col>
                  <Col md={2}>{list.price}</Col>
                  <Col md={2}>
                    <Form.Control 
                      as='select'
                      value={list.qty}
                      onChange={(e) => dispatch(addQty({_id:list._id,qty:Number(e.target.value)}))}
                    >
                      {[...Array(list.countInStock).keys()].map((x) => (
                        <option key={x+1} value={x+1}>{x+1}</option>
                      ))}
                      
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => handleCartDelete(list._id)}
                      >
                        <i className='fas fa-trash'/>
                      </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))} 
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>
                SubTotal ({cartList.reduce((acc,item) => acc + item.qty, 0)})
                items
              </h3>
              $
              {cartList
                .reduce((acc,item) => acc + (item.qty * item.price), 0)
                .toFixed(2)
              }
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                type='button' 
                className='btn-block' 
                disabled={cartList.length === 0} 
                onClick={handleCheckOut}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}
