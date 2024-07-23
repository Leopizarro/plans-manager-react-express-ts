import { AppDataSource } from "../data-source";
import { ProjectMilestone } from "../entity/ProjectMilestone";
import { getActivityImportanceById } from "./activityImportanceService";
import { getMilestoneStageById } from "./milestoneStageService";
import { getProjectById } from "./projectService";

export interface ProjectMilestoneRequest {
    title: string;
    description: string;
    completedAt: Date | null;
    observation: string;
    projectId: number;
    activityImportanceId: number;
    milestoneStageId: number;
}

export interface UpdateProjectMilestone {
        id: number;
        title: string;
        description: string;
        completedAt: Date | null;
        observation: string;
        projectId: number;
        projectActivityImportanceId: number;
        milestoneStageId: number;
}

const projectMilestoneRepo = AppDataSource.getRepository(ProjectMilestone);

export const createMilestone = async (milestoneInformation: ProjectMilestoneRequest) => {
    try {
        const newProjectMilestone = new ProjectMilestone();
        newProjectMilestone.title = milestoneInformation.title;
        newProjectMilestone.description = milestoneInformation.description;
        newProjectMilestone.observation = milestoneInformation.observation;
        newProjectMilestone.createdAt = new Date();
        newProjectMilestone.project = await getProjectById(milestoneInformation.projectId);
        newProjectMilestone.projectActivityImportance = await getActivityImportanceById(milestoneInformation.activityImportanceId);
        const milestoneStage = await getMilestoneStageById(milestoneInformation.milestoneStageId);
        if (milestoneStage?.code === 'DONE') {
            newProjectMilestone.completedAt = milestoneInformation.completedAt
        }
        newProjectMilestone.milestoneStage = milestoneStage;
        const projectMilestoneSaved = await projectMilestoneRepo.save(newProjectMilestone); 
        return projectMilestoneSaved;
    } catch (error) {
        throw Error('Ha ocurrido un error creado el hito!')
    }
}

export const getProjectMilestonesById = async (projectId: number): Promise<ProjectMilestone[]> => {
    try {
        const projectFromDb = await getProjectById(projectId);
        const projectMilestones = await projectMilestoneRepo.findBy({
            project: projectFromDb,
        })
        return projectMilestones
    } catch (error) {
        throw Error('Hubo un error intentando obtener los hitos!')
    }
}

export const getMilestoneById = async (id: number): Promise<ProjectMilestone> => {
    try {
        const milestone = await projectMilestoneRepo.findOneBy({
            id
        });
        return milestone
    } catch (error) {
        throw Error('Ha ocurrido un error obteniendo el hito!')
    }
}

export const deleteMilestoneById = async (id: number): Promise<ProjectMilestone> => {
    try {
        const milestoneToDelete = await getMilestoneById(id);
        const milestoneDeleted = await projectMilestoneRepo.remove(milestoneToDelete);
        return milestoneDeleted;
    } catch (error) {
        throw Error('Ha ocurrido un error intentando borrar el hito!')
    }
}
export const updateMilestone = async (milestoneInformation: UpdateProjectMilestone): Promise<ProjectMilestone> => {
    try {
        const milestoneFromDb = await getMilestoneById(milestoneInformation.id);
        milestoneFromDb.title = milestoneInformation.title;
        milestoneFromDb.description = milestoneInformation.description;
        milestoneFromDb.completedAt = milestoneInformation.completedAt;
        if (milestoneFromDb?.projectActivityImportance?.id !== milestoneInformation?.projectActivityImportanceId) {
            const newActivityImportance = await getActivityImportanceById(milestoneInformation?.projectActivityImportanceId)
            milestoneFromDb.projectActivityImportance = newActivityImportance
        }
        if (milestoneFromDb?.milestoneStage?.id !== milestoneInformation?.milestoneStageId) {
            const newMilestoneStage = await getMilestoneStageById(milestoneInformation?.milestoneStageId);
            milestoneFromDb.milestoneStage = newMilestoneStage;
        }
        const milestoneUpdated = await projectMilestoneRepo.save(milestoneFromDb);
        return milestoneUpdated
    } catch (error) {
        throw Error('Ha ocurrido un error actualizando el hito!')
    }
}