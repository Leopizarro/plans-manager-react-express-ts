import { RequestHandler } from "express"
import { getAllMilestoneStages } from "../services/milestoneStage.service"


export const getAllMilestoneStagesController: RequestHandler = async (req, res, next) => {
    try {
        const milestoneStages = await getAllMilestoneStages();
        res.status(200).json({
            ok: true,
            message: 'Etapas de hito enviadas con éxito!',
            milestoneStages,
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error obteniendo las etapas de un hito'
        })
    }
}