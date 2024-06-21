import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { createProduct, editProduct, proDetails } from '../actions/productThunk'
import { productCreateReset } from '../reducers/productSlice'

export default function ProductEditPage() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error,loading,details:product} = useSelector((state)=> state.product.productDetails)
  const {error:errorCreate,loading:loadingCreate,successCreate} = useSelector((state)=> state.product.productCreate)
  const {user:userInfo} = useSelector((state) => state.user.userInfo)
  const [formData,setFormData] = useState({
    name:'',
    price:'',
    image:'',
    brand:'',
    countInStock:'',
    category:'',
    description:''
  })
  const [uploading,setUploading] = useState(false)

  useEffect(()=>{

    if(!userInfo || !userInfo.isAdmin)
      navigate('/login')

    if(successCreate){
      dispatch(productCreateReset())
      navigate('/admin/productlist')
    }else{
      if(id !== 'null'){
        if(!product || product._id !== id)
          dispatch(proDetails(id))
        else{
          setFormData({
            name: product.name,
            price: product.price,
            image: product.image,
            brand: product.brand,
            countInStock:product.countInStock,
            category: product.category,
            description: product.description
          })
        }
      }
    }

  },[dispatch,navigate,product,userInfo,successCreate])

  const handleChange = (e) => {

    const {id,value} = e.target

    setFormData((prevState) => ({
      ...prevState,
      [id]:value
    }))
    
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const form = new FormData()
    form.append('image', file)
    setUploading(true)

    try {

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const {data} = await axios.post('/api/upload', form, config)
      setFormData((pre)=> ({
        ...pre,
        image:data
      }))
      setUploading(false)

    } catch (error) {
      console.error(error.response.data.message)
      setUploading(false)   
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(id === 'null'){
      dispatch(createProduct({formData}))
    }else{
      dispatch(editProduct({id,formData}))
    }
  }

  const handleGoBack = () => {
    if(errorCreate)
      dispatch(productCreateReset())
      
    navigate('/admin/productlist')
  }

  return (
    <>
      <Button onClick={handleGoBack} className='btn btn-light my-3'>
        Go back
      </Button>

      <FormContainer>
        {id !== 'null' ? (<h1>Edit Product</h1>) : (<h1>Create Product</h1>)}
        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ): error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name' className='form-group'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='price' className='form-group'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='image' className='form-group'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={formData.image}
                onChange={handleChange}
              />
              <Form.Control
                type='file'
                label='Choose File'
                onChange={uploadFileHandler}
              />
              {uploading && <Loader/>}
            </Form.Group>

            <Form.Group controlId='brand' className='form-group'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={formData.brand}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='countInStock' className='form-group'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={formData.countInStock}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='category' className='form-group'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='description' className='form-group'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              {id === 'null' ? 'Create' : 'Edit'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
