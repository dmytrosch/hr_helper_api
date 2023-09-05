import { Router } from "express";
import { addProject, getProjectById, getProjectsList, updateProject } from "../handlers/projects.js";

const projectsRouter = Router()

projectsRouter.get('/:id', getProjectById)
projectsRouter.get('/', getProjectsList)
projectsRouter.post('/', addProject);
projectsRouter.patch('/:id', updateProject)

export default projectsRouter