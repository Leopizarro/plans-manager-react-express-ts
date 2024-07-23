import { RequestHandler } from "express"
import { getAllActivityImportances } from "../services/activityImportanceService"


export const getAllActivityImportancesController: RequestHandler = async (req, res, next) => {
    try {
        const activityImportances = await getAllActivityImportances();
        res.status(200).json({
            ok: true,
            message: 'Importancia de actividades enviadas con éxito!',
            activityImportances,
        })
    } catch(error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error obteniendo las importancias de actividades!'
        })
    }
}