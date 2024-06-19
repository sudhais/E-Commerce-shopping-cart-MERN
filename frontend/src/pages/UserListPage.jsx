import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Button, Table } from 'react-bootstrap'
import {listUser, userDelete} from '../actions/userThunk'


export default function UserListPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userInfo, userList, loading, error} = useSelector((state)=> state.user)

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listUser())
    }else{
      navigate('/login')
    }

  }, [userInfo,dispatch])

  const handleDelete = (id) => {

    if(window.confirm('Are you sure')){
      dispatch(userDelete(id))
    }

  }


  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ): error ? (
        <Message variant='danger'>{error}</Message>
      ): (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ISADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList && userList.map((user,index) => (
              <tr key={index}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.isAdmin ? (
                  <i className='fas fa-check' style={{color:'green'}}></i>
                ): (
                  <i className='fas fa-times' style={{color:'red'}}></i>
                )}</td>
                <td>
                  <Link to='/'>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'/>
                    </Button>
                  </Link>
                  <Button 
                    variant='danger' 
                    className='btn-sm'
                    onClick={() => handleDelete(user._id)}
                  >
                    <i className='fas fa-trash'/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

      )}
    </>
  )
}
