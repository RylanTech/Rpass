import { Router } from 'express';
import { createUser, getUser, getallUsers, loginUser, verify } from '../controllers/userController';

const router = Router();

router.post('/create-account', createUser);
router.post('/signin', loginUser)
router.get('/getallusers', getallUsers)
router.get('/', getUser)
router.post('/verify', verify)

export default router;