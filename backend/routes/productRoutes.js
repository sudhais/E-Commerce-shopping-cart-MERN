import {Router} from 'express'
import {protect,admin} from '../middleware/authMiddleware.js'
import {
  getProducts,
  createProduct,
  getProductById,
  deleteProductById,
  updateProductById,
  createPoductReview
}from '../controllers/productController.js'

const router = Router()

router.route('/')
  .get(getProducts)
  .post(protect,admin,createProduct)

router.route('/:id')
  .get(getProductById)
  .delete(protect,admin,deleteProductById)
  .put(protect,admin,updateProductById)

router.route('/:id/reviews')
  .post(protect,createPoductReview)

export default router