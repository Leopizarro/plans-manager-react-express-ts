import { RequestHandler } from "express";
import { Project } from "../entity/Project";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { ProjectCategory } from "../entity/ProjectCategory";
import { In } from "typeorm";

const projectRepository = AppDataSource.getRepository(Project);
const userRepository = AppDataSource.getRepository(User);
const projectCategRepository = AppDataSource.getRepository(ProjectCategory);


export const createProject: RequestHandler = async (req, res, next) => {
    const request = (req.body as {projectTitle: string, description: string, completionRate: number, createdAt: Date, updatedAt: Date, userId: number, projectCategories: string });
    const projectToInsert = new Project ();
    const user = await userRepository.findOneBy({
        id: request.userId
    });
    projectToInsert.projectTitle = request.projectTitle;
    projectToInsert.description = request.description;
    projectToInsert.completionRate = request.completionRate;
    projectToInsert.createdAt = new Date();
    projectToInsert.updatedAt = new Date();
    projectToInsert.user = user;
    if (request?.projectCategories?.length) {
        const arrayOfCategories = request.projectCategories.split(',')
        projectToInsert.projectCategories = [];
        for await (const pC of arrayOfCategories) {
            const projectCategExists = await projectCategRepository.findOneBy({
                id: Number(pC)
            });
            if (projectCategExists) {
                projectToInsert.projectCategories.push(projectCategExists)
            }
        }
    }
    const projectCreated = await projectRepository.save(projectToInsert)
    res.status(201).json({ ok: true, message: 'Proyecto creado con éxito!', projectCreated})

};

export const deleteProject: RequestHandler = async (req, res, next) => {
    const idToDelete = Number((req.params as {id: string}).id);
    const projectToRemove: Project = await projectRepository.findOneBy({
        id: idToDelete
    });
    await projectRepository.remove(projectToRemove);
    res.status(200).json({
        ok: true,
        message: 'PROJECTO ELIMINADO CON ÉXITO',
        idDeleted: idToDelete,
    })
}

export const getProjects: RequestHandler = async (req,res,next) => {
    const projects = await projectRepository.find({
        relations: {
            user: true,
            projectCategories: true,
            projectMilestones: true,
        }
    })
    res.status(200).json({
        ok: true,
        message: 'Proyectos encontrados con éxito!',
        projects
    });
}

export const updateProject: RequestHandler = async (req,res,next) => {
    const idToUpdate = Number((req.params as { id: string }).id);
    const updatedProjectInfo = (req.body as {projectTitle: string, description: string, completionRate: number, createdAt: Date, updatedAt: Date, userId: number, projectCategories: string });
    const reqProjectCategories = updatedProjectInfo.projectCategories.split(',');
    const projectToUpdate = await projectRepository.findOneBy({
        id: idToUpdate
    })
    const user = await userRepository.findOneBy({
        id: updatedProjectInfo.userId
    });
    projectToUpdate.projectTitle = updatedProjectInfo.projectTitle;
    projectToUpdate.description = updatedProjectInfo.description;
    projectToUpdate.completionRate = updatedProjectInfo.completionRate;
    projectToUpdate.updatedAt = new Date();
    projectToUpdate.user = user;
    if (updatedProjectInfo.projectCategories.length) {
        const projectCategoriesFromDb = await projectCategRepository.findBy({
            id: In(reqProjectCategories.map(item => Number(item)))
        });
        if (projectCategoriesFromDb.length === reqProjectCategories.length) {
        projectToUpdate.projectCategories = projectCategoriesFromDb } else { res.status(404).json({
            ok: false,
            message: 'Categorías de proyecto no encontradas en la DB !',
        })
        return;
        }
    }
    const projectUpdated = await projectRepository.save(projectToUpdate);
    res.status(200).json({ ok: true, message: 'Proyecto con ID:' + idToUpdate + 'actualizado !', projectUpdated: projectUpdated })
}

export const getOneProject: RequestHandler = async (req, res, next) => {
    const idToSearch = Number((req.params as { id: string }).id);
    const projectFromDb = await projectRepository.findOne({
        where: {
            id: idToSearch
        },
        relations: {
            projectCategories: true,
            projectMilestones: {
                projectActivityImportance: true,
            },
            user: true
        }
    })
    if (projectFromDb) {
        res.status(200).json({
            ok: true,
            message: "Proyecto encontrado con éxito!",
            project: projectFromDb,
        })
    } else {
        res.status(404).json({
            ok: false,
            message: "El proyecto solicitado no ha sido encontrado",
        })
    }
}