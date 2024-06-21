import ProductModel from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'


//@access public
export const getProducts = asyncHandler(async (req,res) => {

  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    } : {};
    
  const count = await ProductModel.countDocuments({...keyword})

  const products = await ProductModel.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page-1))
  if(products){
    res.status(200).json({
      products,
      page,
      pages: Math.ceil(count / pageSize)
    })
  }else{
    res.status(500)
    throw new Error('something went wrong please try again later')
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
    res.status(200).json(product)
  }else{
    res.status(400)
    throw new Error('product not found')
  }


})

//@access public
export const getTopProducts = asyncHandler(async (req,res) => {

  const product = await ProductModel.find({}).sort({rating:-1}).limit(3)
  if(product){
    res.status(200).json({
      product
    })
  }else{
    res.status(500)
    throw new Error('something went wrong please try again later')
  }

})

//@access private
export const createPoductReview = asyncHandler(async (req,res) => {

  const {rating, comment} = req.body
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('invalid product id')
  }

  const product = await ProductModel.findById(id)

  if(!product){
    res.status(404)
    throw new Error('product not found')
  }

  const isAlreadyReviewed = product.reviews.length !== 0 ? (product.reviews.some(
    (r) => r.user.toString() === req.user._id.toString()
  )) : false
  if (isAlreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id
  }

  product.reviews.push(review)      //adding reviews to product review array
  product.numReviews = product.reviews.length     //calculating total number of reviews

  //calculating average rating
  product.rating = product.reviews.reduce((acc,item) => item.rating + acc, 0) / product.reviews.length  
  
  const updatePro = await product.save()
  if(!updatePro){
    res.status(400)
    throw new Error('Failed to add reviewed')
  }else {
    res.status(200).json({
      message: 'successfully added reviews'
    })
  }

})

//@access admin only
export const createProduct = asyncHandler(async (req,res) => {

  const product = req.body
  
  const isExists = await ProductModel.findOne({name:product.name})
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
  res.status(201).json(iscreated)

})

//@aaccess admin only
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

//@aaccess admin only
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
    res.status(200).json(updatedProduct)
  else{
    res.status(400)
    throw new Error('failed to update')
  }
  
})
