import {Router} from 'express'
import {protect,admin} from '../middleware/authMiddleware.js'
import {
  addOrderItem,
  getMyOrders,
  getOrderById,
  getOrderItems,
} from '../controllers/orderController.js'

const router = Router()

router.route('/')
  .get(protect,admin,getOrderItems)
  .post(protect,addOrderItem)

router.route('/myorders').get(protect,getMyOrders)

router.route('/:id').get(protect,admin,getOrderById)

export default router