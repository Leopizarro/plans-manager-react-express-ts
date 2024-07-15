import { RequestHandler } from "express"
import { AppDataSource } from "../data-source"
import { MilestoneStage } from "../entity/MilestoneStage"


const milestoneStagesRepo = AppDataSource.getRepository(MilestoneStage)


export const getAllMilestoneStages: RequestHandler = async (req, res, next) => {
    const milestoneStages = await milestoneStagesRepo.find();
    res.status(200).json({
        ok: true,
        message: 'Etapas de hito enviadas con éxito!',
        milestoneStages,
    })
}