import { RequestHandler } from "express";
import { ProjectRequest, createProject, deleteProject, getProjectById, getProjects, updateProject } from "../services/projectService";


export const createProjectController: RequestHandler = async (req, res, next) => {
    const request = (req.body as ProjectRequest);
    try {
        const projectCreated = await createProject(request);
        res.status(201).json({ ok: true, message: 'Proyecto creado con éxito!', projectCreated})
    } catch (error) {
        throw Error('Ha ocurrido un error');
    }
};

export const deleteProjectController: RequestHandler = async (req, res, next) => {
    const idToDelete = Number((req.params as {id: string}).id);
    try {
        const projectDeleted = await deleteProject(idToDelete)
        res.status(200).json({
            ok: true,
            message: 'PROJECTO ELIMINADO CON ÉXITO',
            projectDeleted,
        })
    } catch (error) {
        throw Error('Ha ocurrido un error eliminando el proyecto')
    }
}

export const getProjectsController: RequestHandler = async (req,res,next) => {
    try {
        const projects = await getProjects();
        res.status(200).json({
            ok: true,
            message: 'Proyectos encontrados con éxito!',
            projects
        });

    } catch (error) {
        throw Error('Hubo un error obteniendo los proyectos')
    }
}

export const updateProjectController: RequestHandler = async (req,res,next) => {
    try {
        const idToUpdate = Number((req.params as { id: string }).id);
        const updatedProjectInfo = (req.body as {projectTitle: string, description: string, completionRate: number, createdAt: Date, updatedAt: Date, userId: number, projectCategories: string });
        const projectUpdated = await updateProject({id: idToUpdate, ...updatedProjectInfo })
        res.status(200).json({ ok: true, message: 'Proyecto con ID:' + projectUpdated.id + 'actualizado !', projectUpdated: projectUpdated })
    } catch (error) {
        throw Error('Ha ocurrido un error actualizando el proyecto!')
    }
}

export const getOneProjectController: RequestHandler = async (req, res, next) => {
    try {
        const idToSearch = Number((req.params as { id: string }).id);
        const projectFromDb = await getProjectById(idToSearch);
        res.status(200).json({
            ok: true,
            message: "Proyecto encontrado con éxito!",
            project: projectFromDb,
        })
    } catch (error) {
        throw Error('Ha ocurrido un error intentando obtener el proyecto!')
    }
}