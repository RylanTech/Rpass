import { Router } from 'express';
import { addTwoFactor, createUser, getTwoFactorStatus, getUser, getallUsers, loginUser, removeTwoFactor, testTwoFactor, verify } from '../controllers/userController';

const router = Router();

router.post('/create-account', createUser);
router.post('/signin', loginUser)
router.get('/getallusers', getallUsers)
router.get('/', getUser)
router.post('/verify', verify)
router.post('/addtwofactor', addTwoFactor)
router.post('/removetwofactor', removeTwoFactor)
router.get('/twofactorstatus', getTwoFactorStatus)
router.post('/testtwofactor', testTwoFactor)

export default router;