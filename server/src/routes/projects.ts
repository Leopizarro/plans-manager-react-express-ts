import { Router } from 'express';
import { createProject, getProjects, updateProject, deleteProject, getOneProject } from '../controllers/projects';

const router = Router();

router.post('/create', createProject);

router.get('/', getProjects);

router.get('/:id', getOneProject);

router.patch('/update/:id', updateProject);

router.delete('/delete/:id', deleteProject);

export default router;