import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Form } from 'react-bootstrap'
import axios from 'axios'

export default function ProductEditPage() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error,loading} = useSelector((state)=> state.product.productDetails)
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

  },[])

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
      console.log(data);
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

  return (
    <>
      <Link to={'/'} className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        {id !== 'null' ? (<h1>Edit Product</h1>) : (<h1>Create Product</h1>)}

        {loading ? (
          <Loader />
        ): error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form>
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
                // custom
                onChange={uploadFileHandler}
              />
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
              <Form.Label>Price</Form.Label>
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
          </Form>
        )}
      </FormContainer>
    </>
  )
}
