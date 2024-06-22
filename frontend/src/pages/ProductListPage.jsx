import React, { useEffect } from 'react'
import {Row,Col, Button, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteProduct, listProducts } from '../actions/productThunk'
import Paginate from '../components/Paginate'

export default function ProductListPage() {
  const {pageNumber} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, error, list:products,page,pages} = useSelector((state)=> state.product.productList)
  const {loading: loadingDelete, error : errorDelete} = useSelector((state)=> state.product.productDelete)
  const {user:userInfo} = useSelector((state) => state.user.userInfo)

  useEffect(() => {

    if(!userInfo || !userInfo.isAdmin)
      navigate('/login')

    dispatch(listProducts({pageNumber}))

  }, [dispatch,navigate,userInfo])

  const handleCreateProduct = () => {
    navigate(`/admin/product/${null}/edit`)
  }

  const handleDelete = (id) => {
    if(window.confirm('are you sure'))
      dispatch(deleteProduct(id))
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
      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
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
                      onClick={() => handleDelete(product._id)}
                    >
                      <i className='fas fa-trash'/>
                    </Button>
                  </td>
                </tr>
              ))}

            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}

    </>
  )
}
