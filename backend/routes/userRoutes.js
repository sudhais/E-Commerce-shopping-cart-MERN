import {Router} from 'express'
import { RegisterUser } from '../controllers/userController.js';

const router = Router();

router.route('/').post((req,res)=> {
  res.send('hellow')
})
router.route('/reg').post(RegisterUser)

export default router