import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Project } from "../entity/Project";
import { ProjectCategory } from "../entity/ProjectCategory";
import { User } from "../entity/User";

export interface ProjectRequest {
    projectTitle: string,
    description: string,
    completionRate: number,
    userId: number,
    projectCategories: string
}

export interface UpdateProject {
    id: number,
    projectTitle: string,
    description: string,
    completionRate: number,
    createdAt: Date,
    updatedAt: Date,
    userId: number,
    projectCategories: string

}

const projectRepository = AppDataSource.getRepository(Project);
const userRepository = AppDataSource.getRepository(User);
const projectCategRepository = AppDataSource.getRepository(ProjectCategory);

export const createProject = async (projectInformation: ProjectRequest) => {
    const projectToInsert = new Project();
    const user = await userRepository.findOneBy({
        id: projectInformation.userId
    });
    projectToInsert.projectTitle = projectInformation.projectTitle;
    projectToInsert.description = projectInformation.description;
    projectToInsert.completionRate = projectInformation.completionRate;
    projectToInsert.createdAt = new Date();
    projectToInsert.updatedAt = new Date();
    projectToInsert.user = user;
    if (projectInformation?.projectCategories?.length) {
        projectToInsert.projectCategories = await getProjectCategoriesFromString(projectInformation.projectCategories)
    }
    const projectCreated = await projectRepository.save(projectToInsert)
    return projectCreated;
}

const getProjectCategoriesFromString = async (projectCategoriesString: string): Promise<ProjectCategory[]> => {
    const projectCategoriesArray: ProjectCategory[] = [];
    const projectCategoryIds = projectCategoriesString.split(',');
    for await (const projectCategoryId of projectCategoryIds) {
        const projectCategoryExists = await projectCategRepository.findOneBy({
            id: Number(projectCategoryId)
        });
        if (projectCategoryExists) {
            projectCategoriesArray.push(projectCategoryExists)
        }
    }
    return projectCategoriesArray;

}

export const deleteProject = async (id: number): Promise<Project> => {
    const projectToRemove: Project = await projectRepository.findOneBy({
        id
    });
    if (projectToRemove) {
        const projectRemoved = await projectRepository.remove(projectToRemove);
        return projectRemoved
    }
    throw Error('Proyecto no encontrado')

}

export const getProjects = async (): Promise<Project[]> => {
    try {
        const projects = await projectRepository.find({
            relations: {
                user: true,
                projectCategories: true,
                projectMilestones: true,
            }
        })
        return projects;
    } catch (error) {
        throw Error('Hubo un error obteniendo los proyectos')
    }
}

export const updateProject = async (projectToUpdate: UpdateProject ): Promise<Project> => {
    try {
        const projectFromDb = await projectRepository.findOneBy({
            id: projectToUpdate.id
        })
        const user = await userRepository.findOneBy({
            id: projectToUpdate.userId
        });
        projectFromDb.projectTitle = projectToUpdate.projectTitle;
        projectFromDb.description = projectToUpdate.description;
        projectFromDb.completionRate = projectToUpdate.completionRate;
        projectFromDb.updatedAt = new Date();
        projectFromDb.user = user;
        projectFromDb.projectCategories = await getProjectCategoriesFromString(projectToUpdate.projectCategories)
        const projectUpdated = await projectRepository.save(projectFromDb);
        return projectUpdated
    } catch (error) {
        throw Error('Ha ocurrido un error actualizando el proyecto!')
    }
}

export const getProjectById = async (id: number): Promise<Project> => {
    try {
        const projectFromDb = await projectRepository.findOne({
            where: {
                id
            },
            relations: {
                projectCategories: true,
                projectMilestones: {
                    projectActivityImportance: true,
                },
                user: true
            }
        });

        if (projectFromDb) {
            return projectFromDb
        }

        throw Error('Proyecto no encontrado')
    } catch (error) {
        throw Error('Ha ocurrido un error obteniendo el proyecto!')
    }
}