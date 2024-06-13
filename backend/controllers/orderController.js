import AsyncHandler from "express-async-handler"
import OrderModel from '../models/orderModel.js'

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