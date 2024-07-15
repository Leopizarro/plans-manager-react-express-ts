import { Router } from 'express';
import { getAllActivityImportances } from '../controllers/activityImportance';

const router = Router();

router.get('/', getAllActivityImportances);

export default router;