import { Router } from 'express';
import { createProjectMilestone, deleteProjectMilestone, getProjectMilestones, updateProjectMilestone } from '../controllers/projectMilestones.controller';

const router = Router();

router.post('/create', createProjectMilestone);

router.get('/', getProjectMilestones);

router.patch('/update/:id', updateProjectMilestone);

router.delete('/delete/:id', deleteProjectMilestone);

export default router;