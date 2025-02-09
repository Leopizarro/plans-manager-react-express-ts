import { Router } from 'express';
import { getAllProjectCategoriesController } from '../controllers/projectCategories.controller';

const router = Router();

router.get('/', getAllProjectCategoriesController);

export default router;