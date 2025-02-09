import { AppDataSource } from "../data-source";
import { ProjectCategory } from "../entity/ProjectCategory";

const projectCategoryRepo = AppDataSource.getRepository(ProjectCategory);


export const getAllProjectCategories = async (): Promise<ProjectCategory[]> => {
    try {
        const projectCategories = await projectCategoryRepo.find();
        return projectCategories
    } catch (error) {
        throw Error('Ha ocurrido un error obteniendo las categorías de proyecto!')
    }
}