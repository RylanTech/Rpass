import { Router } from 'express';
import { createPass, editPass, getPass, getPassTitles, searchPass } from '../controllers/passController';

const router = Router();

router.get('/', getPassTitles)
router.post('/:name', getPass)
router.post('/', createPass)
router.put('/', editPass)
router.get('/search/:query', searchPass)

export default router;