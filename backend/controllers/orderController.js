import AsyncHandler from "express-async-handler"
import OrderModel from '../models/orderModel.js'
import ProductModel from '../models/productModel.js'
import mongoose from "mongoose"

//@access admin only
export const getOrderItems = AsyncHandler(async (req,res) => {

  //the populate function is retrieve the ref id details from other collection
  //in user properties it replace the id and the name fields
  const orders = await OrderModel.find({}).populate('user', '_id name') 
  if(orders)
    res.status(200).json(orders)
  else{
    res.status(500)
    throw new Error('failed to fetch the data')
  }
})

//@access private
export const addOrderItem = AsyncHandler( async (req,res) => {

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body

  if(orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  }

  // Check stock availability for each product in the order
  for (const item of orderItems) {
    const product = await ProductModel.findById(item.product);
    console.log(item.product);

    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.product}`);
    }

    if (product.countInStock < item.qty) {
      res.status(400);
      throw new Error(`Not enough stock for product: ${product.name}`);
    }
  }

  const order = new OrderModel({
    orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
  })

  const createdOrder = await order.save()

  if(createdOrder)
    res.status(201).json(createdOrder)
  else{
    res.status(500)
    throw new Error('failed to update the data')
  }
  
})

//@access private
export const getMyOrders = AsyncHandler(async (req,res) => {

  const orders = await OrderModel.find({user:req.user._id})
  if(orders){
    res.status(200).json(orders)
  }else{
    res.status(400)
    throw new Error('orders not found')
  }
})

//@access admin only
export const getOrderById = AsyncHandler(async (req,res) => {

  const {id} = req.params 

  validMongoId(id)

  const order = await OrderModel.findById(id).populate('user', 'name email')

  if(order){
    res.status(200).json(order)
  }else{
    res.status(404)
    throw new Error('order not found')
  }

})

//@access private
export const updateOrderToPaid = AsyncHandler(async (req,res) => {

  const {id} = req.params 
  validMongoId(id)

  const order = await OrderModel.findById(id)
  if(!order) {
    res.status(404)
    throw new Error('order not found')
  }

  order.isPaid = true,
  order.paidAt = Date.now()
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address
  }

  const updateOrder = await order.save()
  if(!updateOrder){
    res.status(400)
    throw new Error('failed to update')
  }

  res.status(200).json(updateOrder)
})

export const updateOrderToDelivered = AsyncHandler(async (req,res) => {

  const {id} = req.params 
  validMongoId(id)

  const order = await OrderModel.findById(id)
  if(!order) {
    res.status(404)
    throw new Error('order not found')
  }

  order.isDelivered = true
  order.deliveredAt = Date.now()

  const updatedOrder = await order.save()

  res.status(200).json(updatedOrder)

})

const validMongoId = (id) => {
  if(!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('invalid order id')
  }
}