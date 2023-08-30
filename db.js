import mysql from 'mysql2/promise'; // Обратите внимание на использование mysql2/promise
import dotenv from 'dotenv';
import { formatDate } from './helpers.js';
import { NotFoundError } from './errors.js';

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

  async executeSelectQuery(sql) {
    try {
      const [rows] = await this.pool.query(sql);
      return rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async executeNonQuery(sql) {
    try {
      const [result] = await this.pool.query(sql);
      return result;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getEmployeesList() {
    const employees = await this.executeSelectQuery(`
      SELECT e.id, e.first_name, e.last_name, e.email, e.phone, e.city, e.birthday,
      p.position_name AS position, e.join_date, pr.name AS project
      FROM employees e
      JOIN positions p ON e.position = p.id
      JOIN projects pr ON e.project = pr.id
    `);
    return employees;
  }

  async getEmployeeById(id) {
    const [employee] = await this.executeSelectQuery(`
      SELECT e.id, e.first_name, e.last_name, e.email, e.phone, e.city, e.birthday,
      p.position_name AS position, e.join_date, pr.name AS project
      FROM employees e
      JOIN positions p ON e.position = p.id
      JOIN projects pr ON e.project = pr.id
      WHERE e.id = ${id}
    `);
    console.log(employee);
    if (!employee) {
      throw new NotFoundError(`Employee ${id} does not exist`);
    }
    return employee
  }

  async getPositionByName(positionName) {
    const positionSql = `SELECT * FROM positions WHERE position_name = '${positionName}'`;
    const [position] = await this.executeSelectQuery(positionSql);
    return position;
  };

  async getProjectByName(projectName) {
    const projectSql = `SELECT * FROM projects WHERE name = '${projectName}'`;
    const [project] = await this.executeSelectQuery(projectSql);
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
      positionId,
      join_date = new Date(),
      project,
      projectId
    } = employeeData;
    const insertEmployeeSql = `
    INSERT INTO employees (first_name, last_name, email, phone, city, birthday, position, join_date, project)
    VALUES ('${first_name}', '${last_name}', '${email}', '${phone}', '${city}', '${formatDate(birthday)}', ${positionId}, '${formatDate(
      join_date
    )}', ${projectId})
  `;

    const updatePositionSql = `
    UPDATE positions SET employees_amount = employees_amount + 1 WHERE id = ${positionId}
`;

    const { insertId } = await this.executeNonQuery(insertEmployeeSql);
    await this.executeNonQuery(updatePositionSql);

    const employee = await this.getEmployeeById(insertId)

    return employee
  }


}

const db = new MySQLDB()

export default db