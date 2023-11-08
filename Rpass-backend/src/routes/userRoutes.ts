import { Router } from 'express';
import { createUser, getUser, getallUsers, loginUser } from '../controllers/userController';

const router = Router();

router.post('/create-account', createUser);
router.post('/signin', loginUser)
router.get('/getallusers', getallUsers)
router.get('/', getUser)

export default router;