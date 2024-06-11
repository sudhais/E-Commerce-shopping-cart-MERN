import UserModel from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js'
import asyncHandler from 'express-async-handler'

const RegisterUser = asyncHandler(async (req,res,next) => {

  const {name,email,password} = req.body
  
  const userExits = await UserModel.findOne({email})

  if(userExits){
    res.status(400)
    throw new Error('user already exists')
  }

  const user = await UserModel.create({name,email,password})
  if(user){

    res.status(201).json({
      _id: user._id,
      name:user.name,
      email: user.email,
      profile: user.profilePicture,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  }else{
    res.status(400)
    throw new Error('Invalid user data')
  } 
})

export {
  RegisterUser
}