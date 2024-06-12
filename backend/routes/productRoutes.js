import {Router} from 'express'
import {protect,admin} from '../middleware/authMiddleware.js'
import {
  getProducts,
  createProduct,
  getProductById,
  deleteProductById
}from '../controllers/productController.js'

const router = Router()

router.route('/')
  .get(getProducts)
  .post(protect,admin,createProduct)

router.route('/:id')
  .get(getProductById)
  .delete(protect,admin,deleteProductById)

export default router