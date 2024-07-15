import { RequestHandler } from "express"
import { AppDataSource } from "../data-source"
import { ProjectActivityImportance } from "../entity/ProjectActivityImportance"


const activityImportaceRepo = AppDataSource.getRepository(ProjectActivityImportance)


export const getAllActivityImportances: RequestHandler = async (req, res, next) => {
    const activityImportances = await activityImportaceRepo.find();
    res.status(200).json({
        ok: true,
        message: 'Importancia de actividades enviadas con éxito!',
        activityImportances,
    })
}