import {Router} from 'express'
import { RegisterUser, authUser, updateUser } from '../controllers/userController.js';
import {protect,admin} from '../middleware/authMiddleware.js'

const router = Router();

router.route('/reg').post(RegisterUser)
router.route('/login').post(authUser)
router.route('/:id').put(protect, updateUser)

export default router