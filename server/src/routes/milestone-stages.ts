import { Router } from 'express';
import { getAllMilestoneStages } from '../controllers/milestoneStage';

const router = Router();

router.get('/', getAllMilestoneStages);

export default router;