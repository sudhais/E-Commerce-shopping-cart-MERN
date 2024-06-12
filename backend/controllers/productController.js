import ProductModel from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'


//@access public
export const getProducts = asyncHandler(async (req,res) => {

  const products = await ProductModel.find({})
  if(products){
    res.status(200).json({
      products
    })
  }else{
    res.status(404)
    throw new Error('no products not found')
  }

})

//@access public
export const getProductById = asyncHandler(async (req,res) => {

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('invalid product id')
  }

  const product = await ProductModel.findById(id)
  if(product){
    res.status(200).json({
      product
    })
  }else{
    res.status(400)
    throw new Error('product not found')
  }


})


//@access admin only
export const createProduct = asyncHandler(async (req,res) => {

  const product = req.body

  const isExists = await ProductModel({name:product.name})

  if(isExists){
    res.status(400)
    throw new Error('product already exists')
  }

  const createProduct = new ProductModel({
    name: product.name,
    price: product.price,
    user: req.user._id,
    image: "images/sample.jpg",
    brand: product.brand,
    category: product.category,
    countInStock: product.countInStock,
    description: product.description
  })

  const iscreated = await createProduct.save()
  if(!iscreated){
    res.status(400)
    throw new Error('cannot be created')
  }
  res.status(201).json({
    message: 'successfully created',
    product:iscreated
  })

})

export const deleteProductById = asyncHandler(async (req,res) => {

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('invalid product id')
  }
  const product = await ProductModel.findByIdAndDelete(id)

  if(product){
    res.status(200).json({
      message:'successfully deleted',
      product
    })
  }else {
    res.status(404)
    throw new Error('product not found')
  }

})

export const updateProductById = asyncHandler(async (req,res) => {

  const {id} = req.params
  const { name, price, description, image, brand, category, countInStock } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('invalid product id')
  }

  const product = await ProductModel.findById(id);

  if(!product) {
    res.status(404)
    throw new Error('product not found')
  }

  if(name && name !== product.name){
    const isExists = await ProductModel.findOne({name})
    if(isExists){
      res.status(400)
      throw new Error('already product name exists')
    }
    product.name = name
  }

  if(price && price !== product.price)
    product.price = price

  if(description && description !== product.description)
    product.description = description

  if(image && image !== product.image)
    product.image = image

  if(brand && brand !== product.brand)
    product.brand = brand

  if(category && category !== product.category)
    product.category = category

  if(countInStock && countInStock !== product.countInStock)
    product.countInStock = countInStock


  const updatedProduct = await ProductModel.findByIdAndUpdate(id,product, {new:true})

  if(updatedProduct)
    res.status(200).json({
      message: 'succesfully updated',
      product: updatedProduct
    })

  res.status(400)
  throw new Error('failed to update')
})
