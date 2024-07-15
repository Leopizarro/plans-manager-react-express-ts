import express = require("express");
import cors = require("cors")
import { AppDataSource } from "./data-source"
import { json } from "body-parser";
import projectRoutes from './routes/projects';
import projectMilestoneRoutes from './routes/project-milestones';
import actImpRoutes from './routes/activity-importance';
import milestoneStageRouter from './routes/milestone-stages';
import projectCategoriesRouter from './routes/project-categories';

AppDataSource.initialize().then(async () => {
    console.log('----INICIALIZANDO SERVIDOR----')
    const app = express();

    app.use(json());
    app.use(cors());

    app.use('/projects', projectRoutes);
    app.use('/project-milestones', projectMilestoneRoutes);
    app.use('/activity-importances', actImpRoutes);
    app.use('/milestone-stages', milestoneStageRouter);
    app.use('/project-categories', projectCategoriesRouter);

    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(500).json({
            message: err.message
        });
    })

    app.listen(5000, () => console.log('SERVIDOR EN PUERTO 5000!'));



}).catch(error => console.log(error))
