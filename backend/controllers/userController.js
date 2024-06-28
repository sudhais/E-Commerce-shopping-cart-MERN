import UserModel from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

//get all users
//@access only admin
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

//@access private
const getUserProfile = asyncHandler(async (req,res)=> {
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    prfile: req.user.profilePicture,
  })
})

//@access public
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

//@access public
//login
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

//@access private
const updateProfile = asyncHandler(async (req,res)=>{
  const {name, email, password, isAdmin} = req.body
  const isUserAdmin = req.user.isAdmin ? true : false
  const user = await UserModel.findById(req.user._id)
  if(!user){
    res.status(404)
    throw new Error('user not found')
  }
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
  if(isUserAdmin){
    user.isAdmin = isAdmin
  }
  if(password && !(user.matchPassword(password))){
    user.password = password
  }

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

//@access private
const deleteProfile = asyncHandler(async (req,res) => {

  const user = await UserModel.findByIdAndDelete(req.user._id)

  if(user){
    res.status(200).json({message:'successfully removed'})
  }else{
    res.status(404)
    throw new Error('user not found')
  }
})

//@access only admin
const getUserById = asyncHandler(async (req,res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('invalid user id')
  }

  const user = await UserModel.findById(id)
  if(user){
    req.user = user
    await getUserProfile(req,res)
  }else{
    res.status(404)
    throw new Error('user not found')
  }
})

//@access only admin
const updateUser = asyncHandler(async (req,res)=>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('invalid user id')
  }

  req.user = {_id:id, isAdmin:true}
  await updateProfile(req,res)

})

//@access only admin
const deleteUser = asyncHandler(async (req,res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('invalid user id')
  }

  const user = await UserModel.findByIdAndDelete(id)

  if(user){
    res.status(200).json({success:true,message:'successfully removed'})
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