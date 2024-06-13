import { config } from "dotenv";
import db from './config/dbconnect.js'
import UserModel from "./models/userModel.js";
import ProductModel from "./models/productModel.js"
import users from "./data/users.js"
import products from "./data/products.js"

config()

db()

const importData = async () => {

  try {

    await UserModel.deleteMany()
    await ProductModel.deleteMany()

    const createdUsers = await UserModel.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return {...product, user:adminUser}
    })

    await ProductModel.insertMany(sampleProducts)

    console.log('Data Imported!')
    process.exit()
    
  } catch (error) {

    console.error(`${error}`)
    process.exit(1)
    
  }
}

const destroyData = async () => {

  try {

    await UserModel.deleteMany()
    await ProductModel.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
    
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
