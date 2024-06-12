import {Router} from 'express'
import { 
  RegisterUser, 
  authUser, 
  updateUser, 
  getUsers,
  getUserProfile,
  updateProfile,
  deleteProfile
} from '../controllers/userController.js';
import {protect,admin} from '../middleware/authMiddleware.js'

const router = Router();

router.route('/')
  .post(RegisterUser)
  .get(protect,admin,getUsers)
router.route('/login').post(authUser)
router.route('/profile')
  .get(protect,getUserProfile)
  .put(protect,updateProfile)
  .delete(protect,deleteProfile)
router.route('/:id').put(protect, updateUser)

export default router