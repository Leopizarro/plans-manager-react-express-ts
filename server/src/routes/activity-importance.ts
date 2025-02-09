import { Router } from 'express';
import { getAllActivityImportancesController } from '../controllers/activityImportance.controller';

const router = Router();

router.get('/', getAllActivityImportancesController);

export default router;