import {Router} from 'express'
import { RegisterUser, authUser } from '../controllers/userController.js';

const router = Router();

router.route('/reg').post(RegisterUser)
router.route('/login').post(authUser)

export default router