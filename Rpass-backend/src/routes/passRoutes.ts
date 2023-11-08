import { Router } from 'express';
import { createPass, editPass, getPassTitles } from '../controllers/passController';

const router = Router();

router.get('/', getPassTitles)
router.post('/', createPass)
router.put('/', editPass)

export default router;