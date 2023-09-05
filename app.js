import dotenv from 'dotenv'
import express from 'express'
import db from './db.js'
import { InvalidParamError, NotFoundError } from './errors.js'
import employeesRouter from './routes/employees.js'
import projectsRouter from './routes/projects.js'
import positionsRouter from './routes/positions.js'

dotenv.config()

const app = express()
app.use(express.json());

db.initDB()

app.use('/employees', employeesRouter)
app.use('/projects', projectsRouter)
app.use('/positions', positionsRouter)




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
