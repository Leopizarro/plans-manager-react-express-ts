import { AppDataSource } from "../data-source";
import { ProjectActivityImportance } from "../entity/ProjectActivityImportance";

const projectActImportanceRepo = AppDataSource.getRepository(ProjectActivityImportance);

export const getActivityImportanceById = async (id: number): Promise<ProjectActivityImportance> => {
    try {
        const activityImportanceFromDb = await projectActImportanceRepo.findOneBy({
            id
        })
        if (activityImportanceFromDb) {
            return activityImportanceFromDb
        }
        throw Error('Importancia de actividad no ha sido encontrada!')
    } catch (error) {
        throw Error('Hubo un error obteniendo la importancia de actividad!')
    }
}

export const getAllActivityImportances = async (): Promise<ProjectActivityImportance[]> => {
    try {
        const activityImportances = await projectActImportanceRepo.find();
        return activityImportances
    } catch (error) {
        throw Error('Ha ocurrido un error obteniendo las importancias de actividades')
    }
} 