import { ALLOWED_PROJECT_LIST_FILTERS } from '../constants.js'
import db from '../services/projects.js'
import { NotFoundError } from '../errors.js'

export const getProjectsList = async (req, res, next) => {
  try {
    const {filter} = req.query
    if (filter && !ALLOWED_PROJECT_LIST_FILTERS.includes(filter)){
      throw new NotFoundError(`Projects selector ${filter} is not allowed`)
    }
    const rows = await db.getProjectsList(filter)
    res.json(rows);
  } catch (error) {
    next(error)
  }
}

export const addProject = async (req, res, next) => {
  try {
    const project = await db.addProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error)
  }
}

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params
    const project = await db.getPreparedProjectById(id)
    res.json(project)
  } catch (error) {
    next(error)
  }
}

export const updateProject = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const updatedData = req.body
    const result = await db.updateProject(projectId, updatedData)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

