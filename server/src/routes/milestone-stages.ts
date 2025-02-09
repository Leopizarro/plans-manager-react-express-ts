import { Router } from 'express';
import { getAllMilestoneStagesController } from '../controllers/milestoneStage.controller';

const router = Router();

router.get('/', getAllMilestoneStagesController);

export default router;