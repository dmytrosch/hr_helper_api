import mysql from 'mysql2/promise'; // Обратите внимание на использование mysql2/promise
import dotenv from 'dotenv';
import { formatDate } from './helpers.js';
import { NotFoundError, InvalidParamError } from './errors.js';

dotenv.config();

class MySQLDB {
  constructor() {
    this.pool = null
  }

  initDB() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB
    });
  }

  async executeSQLQuery(sql) {
    try {
      const [rows] = await this.pool.query(sql);
      return rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getEmployeesList() {
    const employees = await this.executeSQLQuery(`
      SELECT e.id, e.first_name, e.last_name, e.email, e.phone, e.city, e.birthday,
      p.position_name AS position, e.join_date, pr.name AS project
      FROM employees e
      JOIN positions p ON e.position = p.id
      JOIN projects pr ON e.project = pr.id
    `);
    return employees;
  }

  async getEmployeeById(id) {
    const [employee] = await this.executeSQLQuery(`
      SELECT e.id, e.first_name, e.last_name, e.email, e.phone, e.city, e.birthday,
      p.position_name AS position, e.join_date, pr.name AS project
      FROM employees e
      JOIN positions p ON e.position = p.id
      JOIN projects pr ON e.project = pr.id
      WHERE e.id = ${id}
    `);
    if (!employee) {
      throw new NotFoundError(`Employee ${id} does not exist`);
    }
    return employee
  }

  async getPositionByName(positionName) {
    const positionSql = `SELECT * FROM positions WHERE position_name = '${positionName}'`;
    const [position] = await this.executeSQLQuery(positionSql);
    return position;
  };

  async getProjectByName(projectName) {
    const projectSql = `SELECT * FROM projects WHERE name = '${projectName}'`;
    const [project] = await this.executeSQLQuery(projectSql);
    return project;
  };

  async addEmployee(employeeData) {
    const {
      first_name,
      last_name,
      email,
      phone,
      city,
      birthday,
      position,
      join_date = new Date(),
      project,
    } = employeeData;
    const positionResult = await this.getPositionByName(position)
    if (!positionResult) {
      throw new InvalidParamError('Position does not exist')
    }

    const projectResult = await this.getProjectByName(project)
    if (!projectResult) {
      throw new InvalidParamError('Project does not exist')
    }
    const insertEmployeeSql = `
    INSERT INTO employees (first_name, last_name, email, phone, city, birthday, position, join_date, project)
    VALUES ('${first_name}', '${last_name}', '${email}', '${phone}', '${city}', '${formatDate(birthday)}', ${positionResult.id}, '${formatDate(
      join_date
      )}', ${projectResult.id})
  `;

    const updatePositionSql = `
    UPDATE positions SET employees_amount = employees_amount + 1 WHERE id = ${positionResult.id}
`;

    const { insertId } = await this.executeSQLQuery(insertEmployeeSql);
    await this.executeSQLQuery(updatePositionSql);

    const employee = await this.getEmployeeById(insertId)

    return employee
  }

  async updateEmployee(id, updatedData) {
    const employee = await this.getEmployeeById(id)

    const {
      position,
      project
    } = updatedData;

    const proceedData = {
      ...employee,
      ...updatedData
    }


    const positionResult = await this.getPositionByName(position || employee.position)
    if (!positionResult) {
      throw new InvalidParamError('Position does not exist')
    }
    proceedData.position = positionResult.id


    const projectResult = await this.getProjectByName(project || employee.project)
    if (!projectResult) {
      throw new InvalidParamError('Project does not exist')
    }
    proceedData.project = projectResult.id

    const updateSql = `
      UPDATE employees
      SET first_name = '${proceedData.first_name}',
          last_name = '${proceedData.last_name}',
          email = '${proceedData.email}',
          phone = '${proceedData.phone}',
          city = '${proceedData.city}',
          birthday = '${formatDate(proceedData.birthday)}',
          position = ${proceedData.position},
          project = ${proceedData.project}
      WHERE id = ${id}
    `;

    await this.executeSQLQuery(updateSql);
    return await this.getEmployeeById(id)
  }

  async deleteEmployee(id) {
    const deleteSql =
      `DELETE FROM employees
     WHERE id = ${id}`

    try {
      await this.executeSQLQuery(deleteSql)
    } catch (error) {
      throw new NotFoundError(`Employee ${id} does not exist`)
    }
  }
}

const db = new MySQLDB()

export default db