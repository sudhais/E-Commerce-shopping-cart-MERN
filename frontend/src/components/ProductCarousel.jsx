import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { topRatedProducts } from '../actions/productThunk'
import Loader from './Loader'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from './Message'

export default function ProductCarousel() {

  const dispath = useDispatch()
  const {error,loading,products} = useSelector((state) => state.product.productTopRated)


  useEffect(() => {
    if(products && products.length === 0) {
      dispath(topRatedProducts());
    }
  }, [products.length])
  return loading ? (
    <Loader/>
  ) : error ? (
    <Message variant={'danger'}>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products && products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={'/'}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h3>
                {product.name} (${product.price})
              </h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
