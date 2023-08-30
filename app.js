import dotenv from 'dotenv'
import express from 'express'
import { addEmployee, getEmployeeById, getList } from './handlers/employees.js'
import db from './db.js'
import { InvalidParamError, NotFoundError } from './errors.js'

dotenv.config()


const app = express()
db.initDB()
app.use(express.json());

app.get('/employees', getList);
app.get('/employees/:id', getEmployeeById)
app.post('/employee', addEmployee);

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