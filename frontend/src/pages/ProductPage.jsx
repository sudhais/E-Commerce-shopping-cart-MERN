import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createProductReview, proDetails } from '../actions/productThunk'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'
import {productReviewCreateReset} from '../reducers/productSlice'

export default function ProductPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id} = useParams()
  const {loading,error,details:product} = useSelector((state) => state.product.productDetails) 
  const {success, error:errorReview} = useSelector((state) => state.product.productReviewCreate)
  const {user:userInfo} = useSelector((state) => state.user.userInfo) 

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  useEffect(() => {
    dispatch(proDetails(id))
  }, [dispatch, id])

  useEffect(() => {
    if (success) {
      alert("Review Submitted")
      setRating(0)
      setComment('')
      dispatch(productReviewCreateReset())
      dispatch(proDetails(id))
    }
  }, [dispatch, success])


  const handleAddToCart = () => {

  }

  const handleGoBack = () => {
    if(errorReview)
      dispatch(productReviewCreateReset())
    navigate('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createProductReview({id,rating,comment}))
  }

  return (
    <>
      <Button className='btn btn-light my-3' onClick={handleGoBack}>
        Go Back
      </Button>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant={'danger'}>{error}</Message>
      ) : (
        <>
          <Meta title={product.name}/>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3} >
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating 
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col><strong>${product.price}</strong></Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>QTY</Col>
                      <Col>
                        <Form.Control 
                          as={'select'} 
                          value={qty} 
                          onChange={(e) => setQty(e.target.value)} 
                        >
                          {
                            [...Array(product.countInStock).keys()].map((x) => (
                              <option key={x+1} value={x+1}>{x+1}</option>
                            ))
                          }
                        </Form.Control>

                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button 
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={() => navigate(`/cart/${product._id}/${qty}`)}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message >No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating}/>
                      <p>{review.createdAt.substring(0,10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {errorReview && (
                      <Message variant='danger'>{errorReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as={'select'}
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as={'textarea'}
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </Form.Group>
                        <Button type='submit' variant='primary'>Submit</Button>
                      </Form>
                    ) : (
                      <Message >Please <Link to={'/login'}>Sign in</Link> to write a review{' '} </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
            </Col>
          </Row>
        </>

      )}
    </>
  )
}
