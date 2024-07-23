import { Router } from 'express';
import { createProjectController, getProjectsController, updateProjectController, deleteProjectController, getOneProjectController } from '../controllers/projects';

const router = Router();

router.post('/create', createProjectController);

router.get('/', getProjectsController);

router.get('/:id', getOneProjectController);

router.patch('/update/:id', updateProjectController);

router.delete('/delete/:id', deleteProjectController);

export default router;