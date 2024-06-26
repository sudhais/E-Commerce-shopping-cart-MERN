import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
import { Card, Col, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productThunk'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Paginate from '../components/Paginate'

export default function HomePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {pageNumber} = useParams()
  const {loading, error, list:products,page,pages} = useSelector((state)=> state.product.productList)
  const {keyword} = useParams()
  const [priceRange,setPriceRange] = useState('')
  const [minRating,setMinRating] = useState(0)
  const [category,setCategory] = useState('')

  useEffect(() => {

    dispatch(listProducts({keyword,pageNumber,priceRange,minRating,category}))
    
  }, [navigate,dispatch,priceRange,minRating,category,pageNumber])



  return (
    <>
      <Meta 
        title={'welcome to Product shop'}
        description={'We sell the best products for cheap'}
        keywords={'electronics, buy electronics, cheap electroincs'}/>
      {keyword ? (
        <Link to={'/'} className='btn btn-light'>
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}

      <h1>Latest Products</h1>
      <Row>
        <Col md={2}>
          <Form.Group controlId='priceRange'>
            <Form.Label>Price Range</Form.Label>
            <Form.Control 
              as={'select'}
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}             
            >
              <option value='' >All</option>
              <option value='0-100' >$0 - $200</option>
              <option value='201-500' >$201 - $500</option>
              <option value='501-1000' >$501 - $1000</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='minRating'>
            <Form.Label>Price Range</Form.Label>
            <Form.Control 
              as={'select'}
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            >
              <option value={0} >Any</option>
              <option value={1} >1 Start</option>
              <option value={2} >2 Start</option>
              <option value={3} >3 Start</option>
              <option value={4} >4 Start</option>
              <option value={5} >5 Start</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Accessories">Accessories</option>
              <option value="Sports">Sports</option>
              <option value="Home">Home</option>
              <option value="Health">Health</option>
              <option value="Beauty">Beauty</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Baby">Baby</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={9}>
          {loading ? (
            <Loader/>
          ) : error ? (
            <Message variant={'danger'} >{error}</Message>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                    <Card className="my-3 p-3 rounded">
                      <Link to={`/product/${product._id}`}>
                        <Card.Img src={product.image} variant='top'/>
                      </Link>
                      <Card.Body >
                        <Link to={`/product/${product._id}`}>
                          <strong>{product.name}</strong>
                        </Link>
                      
                        <Card.Text as='div'>
                          <Rating
                            value={product.rating}
                            text= {`${product.numReviews} reviews`}
                          />
                        </Card.Text>
                        <Card.Text as='h3' >${product.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
          <Paginate 
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </Col>
      </Row>
    </>
  )
}
