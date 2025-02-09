import { RequestHandler } from "express";
import { ProjectMilestone } from "../entity/ProjectMilestone";
import { AppDataSource } from "../data-source";
import { Project } from "../entity/Project";
import { ProjectActivityImportance } from "../entity/ProjectActivityImportance";
import { MilestoneStage } from "../entity/MilestoneStage";
import { ProjectMilestoneRequest, UpdateProjectMilestone, createMilestone, deleteMilestoneById, getProjectMilestonesById, updateMilestone } from "../services/projectMilestone.service";

const projectRepo = AppDataSource.getRepository(Project);
const projectActImportanceRepo = AppDataSource.getRepository(ProjectActivityImportance);
const milestoneStageRepo = AppDataSource.getRepository(MilestoneStage);
const projectMilestoneRepo = AppDataSource.getRepository(ProjectMilestone);


export const createProjectMilestone: RequestHandler = async (req, res, next) => {
    try {
        const request = (req.body as ProjectMilestoneRequest);
        const projectMilestoneSaved = await createMilestone(request)
        res.status(201).json({
            ok: true,
            message: 'Hito de Proyecto creado con éxito!',
            projectMilestone: projectMilestoneSaved,
        })
    } catch(error) {
        res.status(500).json({
            ok: false,
            message: 'Error intentando crear el hito del proyecto!'
        })
    }
}

export const getProjectMilestones: RequestHandler = async (req, res, next) => {
    try {
        const projectId = Number((req.params as {id: string}).id);
        const projectMilestones = await getProjectMilestonesById(projectId);
        res.status(200).json({
            ok: true,
            message: `Hitos del proyecto ${projectId} encontrados !`,
            projectMilestones
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Hubo un error obteniendo los hitos del proyecto!'
        })
    }
    
}

export const deleteProjectMilestone: RequestHandler = async (req, res, next) => {
    try{
        const idToDelete = Number((req.params as {id: string}).id);
        const projectMilestoneDeleted = await deleteMilestoneById(idToDelete);
        res.status(200).json({
            ok: true,
            message: 'Hito de proyecto eliminado con éxito !',
            projectMilestoneDeleted
        });
    }catch (error) {
        res.status(500).json({
            ok:false,
            message: 'Ha ocurrido un error eliminando el hito del proyecto'
        })
    }
}

export const updateProjectMilestone: RequestHandler = async (req, res, next) => {
    try {
        const milestoneId = Number((req.params as {id: string}).id);
        const milestoneNewInformation = (req.body as UpdateProjectMilestone);
        const updatedMilestone = await updateMilestone({id: milestoneId, ...milestoneNewInformation})
        res.status(200).json({
            ok: true,
            message: 'Hito de proyecto editado con éxito !',
            newProjectMilestone: updatedMilestone
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error al momento de actualizar el hito!'
        })
    }

}