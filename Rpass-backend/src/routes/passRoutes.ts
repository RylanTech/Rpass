import { Router } from 'express';
import { createPass, deletePass, editPass, getPass, getPassTitles, resetMasterPass, searchPass } from '../controllers/passController';

const router = Router();

router.get('/', getPassTitles)
router.post('/:name', getPass)
router.post('/', createPass)
router.put('/edit/:id', editPass)
router.get('/search/:query', searchPass)
router.post('/user/reset', resetMasterPass)
router.delete('/delete/:id', deletePass)

export default router;