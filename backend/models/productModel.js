import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: [true, 'name should not be null']
  },
  rating: {       
    type: Number,
    required: [true, 'rating should not be null']    
  },
  comment:{
    type: String,
    required: [true, 'comment should not be null']
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required: [true, 'user id cannot be null'],
    ref: 'User'
  }
  
},{timestamps:true})

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true,'user id cannot be null'],
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'name should not be null'],
    unique: true
  },
  image: {
    type: String,
    required: [true, 'image should not be null']
  },
  brand: {
    type: String,
    required: [true, 'brand should not be null']
  },
  category: {
    type: String,
    required: [true, 'category should not be null']
  },
  description: {
    type: String,
    required: [true, 'description should not be null']
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required:true,
    default: 0
  },
  numReviews: {
    type: Number,
    required:true,
    default: 0
  },
  price: {
    type: Number,
    required:true,
    default: 0
  },
  countInStock: {
    type: Number,
    required:true,
    default: 0
  },

},{timestamps:true})

const Product = mongoose.model('Product', productSchema)

export default Product