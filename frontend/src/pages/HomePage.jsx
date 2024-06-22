import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SearchBox from '../components/SearchBox'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'

export default function HomePage() {
  const navigate = useNavigate()
  const {user:userInfo} = useSelector((state) => state.user.userInfo)
  const {keyword} = useParams()

  useEffect(() => {

    if(!userInfo)
      navigate('/login')

  }, [userInfo])

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
    </>
  )
}
