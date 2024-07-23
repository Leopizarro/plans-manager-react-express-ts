import { RequestHandler } from "express";
import { getAllProjectCategories } from "../services/projectCategoryService";

export const getAllProjectCategoriesController: RequestHandler = async (req, res, next) => {
    try {
        const projectCategories = await getAllProjectCategories()
        res.status(200).json({
            ok: true,
            message: 'Categorías encontradas con éxito!',
            projectCategories
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error al obtener las categorías de proyecto'
        })
    }
}