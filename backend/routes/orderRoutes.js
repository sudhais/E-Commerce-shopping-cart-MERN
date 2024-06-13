import {Router} from 'express'
import {protect,admin} from '../middleware/authMiddleware.js'
import {
  addOrderItem,
  getOrderItems,
} from '../controllers/orderController.js'

const router = Router()

router.route('/')
  .get(protect,admin,getOrderItems)
  .post(protect,addOrderItem)

export default router