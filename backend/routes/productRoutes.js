import {Router} from 'express'
import {protect,admin} from '../middleware/authMiddleware.js'
import {
  getProducts,
  createProduct
}from '../controllers/productController.js'

const router = Router()

router.route('/')
  .get(getProducts)
  .post(protect,admin,createProduct)

export default router