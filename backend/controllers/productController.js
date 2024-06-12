import ProductModel from '../models/productModel.js'
import asyncHandler from 'express-async-handler'


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

export const getProductById = asyncHandler(async (req,res) => {

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