import { AppDataSource } from "../data-source";
import { MilestoneStage } from "../entity/MilestoneStage";

const milestoneStageRepo = AppDataSource.getRepository(MilestoneStage);

export const getMilestoneStageById = async (id: number): Promise<MilestoneStage> => {
    try {
        const milestoneStageFromDb = await milestoneStageRepo.findOneBy({
            id
        })
        if (milestoneStageFromDb) {
            return milestoneStageFromDb
        }
        throw Error('Hubo un problema obteniendo la etapa del hito!')
    } catch (error) {
        throw Error('Hubo un problema obteniendo la etapa del hito!')
    }
}

export const getAllMilestoneStages = async (): Promise<MilestoneStage[]> => {
    try {
        const milestoneStages = await milestoneStageRepo.find();
        return milestoneStages
    } catch (error) {
        throw Error('Ha ocurrido un error al obtener las etapas de hito!')
    }
} 