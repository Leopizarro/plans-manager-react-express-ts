import { Router } from 'express';
import { getAllProjectCategories } from '../controllers/projectCategories';

const router = Router();

router.get('/', getAllProjectCategories);

export default router;