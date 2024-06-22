import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SearchBox from '../components/SearchBox'
import { useNavigate } from 'react-router-dom'
import Meta from '../components/Meta'

export default function HomePage() {
  const navigate = useNavigate()
  const {user:userInfo} = useSelector((state) => state.user.userInfo)

  useEffect(() => {

    if(!userInfo)
      navigate('/login')

  }, [userInfo])

  return (
    <div>
      <Meta/>
      HomePage</div>
  )
}
