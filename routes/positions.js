import { Router } from "express";
import { addPosition, deletePosition, getPositionById, getPositionsList, updatePosition } from "../handlers/positions.js";


const positionsRouter = Router()

positionsRouter.get('/:id', getPositionById)
positionsRouter.get('/', getPositionsList)
positionsRouter.post('/', addPosition);
positionsRouter.patch('/:id', updatePosition)
positionsRouter.delete(':id', deletePosition)

export default positionsRouter