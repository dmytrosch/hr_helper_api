import db from '../db.js'
import { InvalidParamError, NotFoundError } from '../errors.js'

export const getList = async (req, res, next) => {
  try {
    const rows = await db.getEmployeesList()
    res.json(rows);
  } catch (error) {
    next(error)
  }
}

export const addEmployee = async (req, res, next) => {
  try {
    const {
      position,
      project
    } = req.body;

    const positionResult = await db.getPositionByName(position)
    if (!positionResult) {
      throw new InvalidParamError('Position does not exist')
    }

    const projectResult = await db.getProjectByName(project)
    if (!projectResult) {
      throw new InvalidParamError('Project does not exist')
    }

    const employee = await db.addEmployee({
      ...req.body,
      positionId: positionResult.id,
      projectId: projectResult.id
    });
    res.json(employee);
  } catch (error) {
    next(error)
  }
}

export const getEmployeeById = async (req, res, next) => {
  try {
    const {id} = req.params
    const employee = await db.getEmployeeById(id)
    res.json(employee)
  } catch (error) {
    next(error)
  }
}