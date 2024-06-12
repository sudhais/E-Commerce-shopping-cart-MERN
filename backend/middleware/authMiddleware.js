import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel.js'

const protect = asyncHandler(async (req,res,next)=>{
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      req.user = await UserModel.findById(decoded.id).select('-password') // find user and removing password property
      next()
      
    } catch (error) {
      res.status(401)
      throw new Error("Not autherized, token failed")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized only admin can perform')
  }
}

export { protect,admin }