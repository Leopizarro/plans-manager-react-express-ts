import { RequestHandler } from "express";
import { ProjectMilestone } from "../entity/ProjectMilestone";
import { AppDataSource } from "../data-source";
import { Project } from "../entity/Project";
import { ProjectActivityImportance } from "../entity/ProjectActivityImportance";
import { MilestoneStage } from "../entity/MilestoneStage";

const projectRepo = AppDataSource.getRepository(Project);
const projectActImportanceRepo = AppDataSource.getRepository(ProjectActivityImportance);
const milestoneStageRepo = AppDataSource.getRepository(MilestoneStage);
const projectMilestoneRepo = AppDataSource.getRepository(ProjectMilestone);


export const createProjectMilestone: RequestHandler = async (req, res, next) => {
    const request = (req.body as {
        title: string,
        description: string,
        completedAt: Date | null,
        observation: string,
        projectId: number,
        activityImportanceId: number,
        milestoneStageId: number
    });
    const newProjectMilestone = new ProjectMilestone();
    newProjectMilestone.title = request.title;
    newProjectMilestone.description = request.description;
    newProjectMilestone.observation = request.observation;
    newProjectMilestone.createdAt = new Date();
    const projectFromDb = await projectRepo.findOneBy({
        id: request.projectId
    })
    if (projectFromDb) {
        newProjectMilestone.project = projectFromDb;
    }
    const pActImpFromDb = await projectActImportanceRepo.findOneBy({
        id: request.activityImportanceId
    })
    if (pActImpFromDb) {
        newProjectMilestone.projectActivityImportance = pActImpFromDb;
    }
    const milestoneStageFromDb = await milestoneStageRepo.findOneBy({
        id: request.milestoneStageId
    })
    if (milestoneStageFromDb) {
        newProjectMilestone.milestoneStage = milestoneStageFromDb;
        milestoneStageFromDb.code === 'DONE' ?
            newProjectMilestone.completedAt = request.completedAt
         : newProjectMilestone.completedAt = null
    }
    const projectMilestoneSaved = await projectMilestoneRepo.save(newProjectMilestone);
    res.status(201).json({
        ok: true,
        message: 'Hito de Proyecto creado con éxito!',
        projectMilestone: projectMilestoneSaved,
    })
}

export const getProjectMilestones: RequestHandler = async (req, res, next) => {
    const projectId = Number((req.params as {id: string}).id)
    const projectFromDb = await projectRepo.findOneBy({
        id: projectId,
    })
    const projectMilestones = await projectMilestoneRepo.findBy({
        project: projectFromDb,
    })
    res.status(200).json({
        ok: true,
        message: `Hitos del proyecto ${projectId} encontrados !`,
        projectMilestones
    })
    
}

export const deleteProjectMilestone: RequestHandler = async (req, res, next) => {
    const idToDelete = Number((req.params as {id: string}).id);
    const projectMilestoneToRemove = await projectMilestoneRepo.findOneBy({
        id: idToDelete
    });
    await projectMilestoneRepo.remove(projectMilestoneToRemove);
    res.status(200).json({
        ok: true,
        message: 'Hito de proyecto eliminado con éxito !',
        projectMilestoneDeleted: projectMilestoneToRemove
    });
}

export const updateProjectMilestone: RequestHandler = async (req, res, next) => {
    const projectMilestoneId = Number((req.params as {id: string}).id);
    const info = (req.body as {
        title: string,
        description: string,
        completedAt: Date | null,
        observation: string,
        projectId: number,
        projectActivityImportanceId: number,
        milestoneStageId: number
    });
    const projectMlstnFromDb = await projectMilestoneRepo.findOneBy({
        id: projectMilestoneId
    });
    projectMlstnFromDb.title = info.title;
    projectMlstnFromDb.description = info.description;
    projectMlstnFromDb.completedAt = info.completedAt;
    if (projectMlstnFromDb.project.id !== info.projectId) {
        const newProject = await projectRepo.findOneBy({
            id: info.projectId,
        })
        projectMlstnFromDb.project = newProject;
    }
    if (projectMlstnFromDb.projectActivityImportance.id !== info.projectActivityImportanceId) {
        const newActImportance = await projectActImportanceRepo.findOneBy({
            id: info.projectActivityImportanceId,
        })
        projectMlstnFromDb.projectActivityImportance = newActImportance;
    }
    if (projectMlstnFromDb.milestoneStage.id !== info.milestoneStageId) {
        const newMilestoneStage = await milestoneStageRepo.findOneBy({
            id: info.milestoneStageId,
        })
        projectMlstnFromDb.milestoneStage = newMilestoneStage;
    }
    const prjectMilestoneUpdated = await projectMilestoneRepo.save(projectMlstnFromDb);
    res.status(200).json({
        ok: true,
        message: 'Hito de proyecto editado con éxito !',
        newProjectMilestone: prjectMilestoneUpdated
    })

}