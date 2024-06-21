import React, { useEffect } from 'react'
import {Row,Col, Button, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link, useNavigate } from 'react-router-dom'
import { listProducts } from '../actions/productThunk'

export default function ProductListPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, error, list:products} = useSelector((state)=> state.product.productList)
  const {user:userInfo} = useSelector((state) => state.user.userInfo)

  useEffect(() => {

    if(!userInfo || !userInfo.isAdmin)
      navigate('/login')

    if(!products.length)
      dispatch(listProducts())
    


  }, [dispatch,navigate,userInfo,products.length])

  const handleCreateProduct = () => {
    navigate(`/admin/product/${null}/edit`)
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={handleCreateProduct}>
            <i className='fas fa-plus'/> Create Product
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ): error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <> 
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {products && products.map((product,index) => (
                <tr key={index}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'/>
                      </Button>
                    </Link>
                    <Button 
                      variant='danger' 
                      className='btn-sm'
                      
                    >
                      <i className='fas fa-trash'/>
                    </Button>
                  </td>
                </tr>
              ))}

            </tbody>
          </Table>
        </>
      )}

    </>
  )
}
