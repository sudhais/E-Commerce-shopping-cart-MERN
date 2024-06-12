import UserModel from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

const getUsers = asyncHandler(async (req,res) => {

  const users = await UserModel.find({})
  if(users.length === 0){
    res.status(404)
    throw new Error('no users available')
  }

  res.status(200).json({
    users
  })

})

const getUserProfile = asyncHandler(async (req,res)=> {
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    prfile: req.user.profilePicture,
  })
})

const RegisterUser = asyncHandler(async (req,res) => {

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

const authUser = asyncHandler(async (req,res) => {
  const {email,password} = req.body
  const user = await UserModel.findOne({email})
  if(user && (user.matchPassword(password))) {
    res.status(200).json({
      _id : user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  }else{
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const updateProfile = asyncHandler(async (req,res)=>{
  const {name, email, password} = req.body
  const user = await UserModel.findById(req.user._id)
  if(name && name !== user.name)
    user.name = name
  if(email && email !== user.email){
    const existUser = await UserModel.findOne({email})
    if(existUser){
      res.status(400)
      throw new Error('user already exists')
    }
    user.email = email
  }
  console.log(user.password);
  if(password && !(user.matchPassword(password)))
    user.password = password

  const updatedUser = await user.save()

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(user._id),
    picture: updateUser.profilePicture
  })

})

const deleteProfile = asyncHandler(async (req,res) => {

  const user = await UserModel.findByIdAndDelete(req.user._id)

  if(user){
    res.status(200).json({message:'successfully removed'})
  }else{
    res.status(404)
    throw new Error('user not found')
  }
})

const getUserById = asyncHandler(async (req,res) => {
  const {id} = req.params

  const user = await UserModel.findById(id)
  if(user){
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
      prfile: req.user.profilePicture,
    })
  }else{
    res.status(404)
    throw new Error('user not found')
  }
})

const updateUser = asyncHandler(async (req,res)=>{
  const {id} = req.params
  let user = req.user

  if(user && !user.isAdmin && user._id.toString() !== id){  
    res.status(401)
    throw new Error('Only update your account')
  }

  if(user &&  user.isAdmin){
    if(user._id.toString() !== id){
      if(!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('user not found')
      }
      const isUserExist = await UserModel.findById(id)
      if(!isUserExist){
        res.status(404)
        throw new Error('user not found')
      }
      user = isUserExist
    }

  }
  

  const {email,password,profilePicture,name} = req.body
  if(password)
    user.password = req.body.password
  if(email && user.email !== email){
    const isUserExists = await UserModel.findOne({email})
    if(isUserExists){
      res.status(400)
      throw new Error('already email exists')
    }
    user.email = email
  }
  user.profilePicture = profilePicture || user.profilePicture
  user.name = name || user.name
  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(user._id),
    picture: updateUser.profilePicture
  })
  

})

const deleteUser = asyncHandler(async (req,res) => {
  const {id} = req.params
  const user = await UserModel.findByIdAndDelete(id)

  if(user){
    res.status(200).json({message:'successfully removed'})
  }else{
    res.status(404)
    throw new Error('user not found')
  }
})

export {
  RegisterUser,
  authUser,
  updateUser,
  getUsers,
  getUserProfile,
  updateProfile,
  deleteProfile,
  getUserById,
  deleteUser
}