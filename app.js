import dotenv from 'dotenv'
import express from 'express'
import { addEmployee, deleteEmployee, getEmployeeById, getEmployeesList, updateEmployee } from './handlers/employees.js'
import db from './db.js'
import { InvalidParamError, NotFoundError } from './errors.js'
import { addProject, getProjectById, getProjectsList, updateProject } from './handlers/projects.js'

dotenv.config()


const app = express()
db.initDB()
app.use(express.json());

app.get('/employees', getEmployeesList);
app.get('/employees/:id', getEmployeeById)
app.post('/employees', addEmployee);
app.patch('/employees/:id', updateEmployee)
app.delete('/employees/:id', deleteEmployee)

app.get('/projects/:selector', getProjectsList)
app.get(/projects/, getProjectsList)
app.get('/projects/:id', getProjectById)
app.post('/projects', addProject);
app.patch('/projects/:id', updateProject)



app.use((error, req, res, next) => {
  let status = 500
  if (
    error instanceof InvalidParamError ||
    error instanceof NotFoundError
  ) {
    status = error.status;
  }
  res.status(status).send({ message: error.message });
})

app.listen(process.env.PORT, () => console.log(`API started at port ${process.env.PORT}`))
