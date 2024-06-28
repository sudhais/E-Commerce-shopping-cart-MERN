import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListOrders } from '../actions/orderThunk'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Button, Table } from 'react-bootstrap'

export default function OrderListPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user:userInfo} = useSelector((state) => state.user.userInfo)
  const {list:orders, loading, error} = useSelector((state) => state.order.orderList) 

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(ListOrders())
    }else{
      navigate('/login')
    }
  },[userInfo])


  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0,10)
                  ) : (
                    <i className='fas fa-times' style={{color:'red'}}/>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0,10)
                  ): (
                    <i className='fas fa-times' style={{color:'red'}}/>
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

    </>
  )
}
