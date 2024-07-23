import { Router } from 'express';
import { getAllMilestoneStagesController } from '../controllers/milestoneStage';

const router = Router();

router.get('/', getAllMilestoneStagesController);

export default router;