import { Router } from "express";
import { addEmployee, deleteEmployee, getEmployeeById, getEmployeesList, updateEmployee } from "../handlers/employees.js";

const employeesRouter = Router()

employeesRouter.get('/:id', getEmployeeById)
employeesRouter.get('/', getEmployeesList);
employeesRouter.post('/', addEmployee);
employeesRouter.patch('/:id', updateEmployee)
employeesRouter.delete('/:id', deleteEmployee)

export default employeesRouter