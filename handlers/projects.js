import { ALLOWED_PROJECT_LIST_SELECTORS } from '../constants.js'
import db from '../db.js'
import { NotFoundError } from '../errors.js'

export const getProjectsList = async (req, res, next) => {
  try {
    const { selector } = req.params
    if (selector && !ALLOWED_PROJECT_LIST_SELECTORS.includes(selector)){
      throw new NotFoundError(`Projects selector ${selector} is not allowed`)
    }
    const rows = await db.getProjectsList(selector)
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
    const project = await db.getProjectById(id)
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

