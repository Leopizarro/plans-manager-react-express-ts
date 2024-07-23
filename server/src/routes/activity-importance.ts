import { Router } from 'express';
import { getAllActivityImportancesController } from '../controllers/activityImportance';

const router = Router();

router.get('/', getAllActivityImportancesController);

export default router;