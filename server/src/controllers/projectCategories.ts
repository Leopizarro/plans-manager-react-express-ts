import { RequestHandler } from "express";
import { AppDataSource } from "../data-source";
import { ProjectCategory } from "../entity/ProjectCategory";

const projectCatRepo = AppDataSource.getRepository(ProjectCategory);

export const getAllProjectCategories: RequestHandler = async (req, res, next) => {
    const projectCategories = await projectCatRepo.find();
    res.status(200).json({
        ok: true,
        message: 'Categorías encontradas con éxito !',
        projectCategories
    })
}