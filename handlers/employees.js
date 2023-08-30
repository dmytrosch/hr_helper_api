import db from '../db.js'

export const getEmployeesList = async (req, res, next) => {
  try {
    const rows = await db.getEmployeesList()
    res.json(rows);
  } catch (error) {
    next(error)
  }
}

export const addEmployee = async (req, res, next) => {
  try {
    const employee = await db.addEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    next(error)
  }
}

export const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params
    const employee = await db.getEmployeeById(id)
    res.json(employee)
  } catch (error) {
    next(error)
  }
}

export const updateEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const updatedData = req.body
    const result = await db.updateEmployee(employeeId, updatedData)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

export const deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    await db.deleteEmployee(employeeId)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
