import mysql from "mysql2/promise"; // Обратите внимание на использование mysql2/promise
import dotenv from "dotenv";
import { formatDate } from "./helpers.js";
import { NotFoundError, InvalidParamError } from "./errors.js";
import {
  ACTIVE_PROJECTS_SELECTOR,
  INACTIVE_PROJECTS_SELECTOR,
} from "./constants.js";

dotenv.config();

class MySQLDB {
  constructor() {
    this.pool = null;
  }

  initDB() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    });
    console.log("connected to DB");
  }

  async _executeSqlQuery(sql) {
    try {
      const [rows] = await this.pool.query(sql);
      return rows;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async getEmployeesList() {
    const employees = await this._executeSqlQuery(`
      SELECT e.id, e.first_name, e.last_name, e.email, e.phone, e.city, e.birthday,
    e.join_date, 
    p.id AS position_id,
    p.position_name AS position_name, 
    pr.id AS project_id,
    pr.name AS project_name
    FROM employees e
    LEFT JOIN positions p ON e.position = p.id
    LEFT JOIN projects pr ON e.project = pr.id
  `);
    return employees.map((employee) => ({
      id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      phone: employee.phone,
      city: employee.city,
      birthday: employee.birthday,
      position: employee.position_id
        ? {
          position_id: employee.position_id,
          position_name: employee.position_name,
        }
        : null,
      project: employee.project_id
        ? {
          project_id: employee.project_id,
          project_name: employee.project_name,
        }
        : null,
      join_date: employee.join_date,
    }));
  }

  async _getEmployeeById(id) {
    const [employee] = await this._executeSqlQuery(`
    SELECT * from employees e
    WHERE e.id = ${id}
    `)

    if (!employee) {
      throw new NotFoundError(`Employee ${id} does not exist`);
    }

    return employee
  }

  async getPreparedEmployeeById(id) {
    const [employee] = await this._executeSqlQuery(`
    SELECT e.id, e.first_name, e.last_name, e.email, e.phone, e.city, e.birthday,
    e.join_date, 
    p.id AS position_id,
    p.position_name AS position_name, 
    pr.id AS project_id,
    pr.name AS project_name
    FROM employees e
    LEFT JOIN positions p ON e.position = p.id
    LEFT JOIN projects pr ON e.project = pr.id
    WHERE e.id = ${id}
  `);
    if (!employee) {
      throw new NotFoundError(`Employee ${id} does not exist`);
    }
    return {
      id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      phone: employee.phone,
      city: employee.city,
      birthday: employee.birthday,
      position: employee.position_id
        ? {
          position_id: employee.position_id,
          position_name: employee.position_name,
        }
        : null,
      project: employee.project_id
        ? {
          project_id: employee.project_id,
          project_name: employee.project_name,
        }
        : null,
      join_date: employee.join_date,
    };
  }

  async addEmployee(employeeData) {
    const {
      first_name,
      last_name,
      email,
      phone,
      city,
      birthday,
      position = null,
      join_date = new Date(),
      project = null,
    } = employeeData;
    if (position) {
      await this._getPositionById(position);
    }
    if (project) {
      await this._getProjectById(project);
    }

    const insertEmployeeSql = `
    INSERT INTO employees (first_name, last_name, email, phone, city, birthday, position, join_date, project)
    VALUES ('${first_name}', '${last_name}', '${email}', '${phone}', '${city}', '${formatDate(
      birthday
    )}', ${position}, '${formatDate(join_date)}', ${project})
  `;

    const { insertId } = await this._executeSqlQuery(insertEmployeeSql);

    const employee = await this.getPreparedEmployeeById(insertId);

    return employee;
  }

  async updateEmployee(id, updatedData) {
    const employee = await this._getEmployeeById(id);

    const { position, project } = updatedData;

    if (position) {
      await this._getPositionById(position);
    }
    if (project) {
      await this._getProjectById(project);
    }

    const proceedData = {
      ...employee,
      ...updatedData,
    };

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

    await this._executeSqlQuery(updateSql);
    return await this.getPreparedEmployeeById(id);
  }

  async deleteEmployee(id) {
    const updatePositionsSql = `
    UPDATE positions
    SET head = null
    WHERE head = ${id}`

    await this._executeSqlQuery(updatePositionsSql)

    const deleteSql = `DELETE FROM employees
     WHERE id = ${id}`;

    try {
      await this._executeSqlQuery(deleteSql);
    } catch (error) {
      throw new NotFoundError(`Employee ${id} does not exist`);
    }
  }

  async getProjectsList(selector) {
    let selectProjectsSql = `
    SELECT id, name, contact_person, contact_email, is_active
    FROM projects
    `;
    if (selector === ACTIVE_PROJECTS_SELECTOR) {
      selectProjectsSql = `
    SELECT id, name, contact_person, contact_email
    FROM projects
    WHERE is_active = 1`;
    }
    if (selector === INACTIVE_PROJECTS_SELECTOR) {
      selectProjectsSql = `
    SELECT id, name, contact_person, contact_email
    FROM projects
    WHERE is_active = 0`;
    }
    const projects = await this._executeSqlQuery(selectProjectsSql);
    return projects.map((p) => {
      const project = { ...p };
      if (project.is_active !== undefined) {
        project.is_active = !!project.is_active;
      }
      return project;
    });
  }

  async _getProjectById(id) {
    const [project] = await this._executeSqlQuery(`
      SELECT * FROM projects
      WHERE id = ${id}
  `);
    if (!project) {
      throw new NotFoundError(`Project ${id} does not exist`);
    }

    return project
  }

  async getPreparedProjectById(id) {
    const projectWithEmployees = await this._executeSqlQuery(`
      SELECT p.id AS project_id, p.name AS project_name, p.contact_person, p.contact_email,
           p.is_active,
           e.id AS employee_id, e.first_name AS employee_first_name, e.last_name AS employee_last_name,
           pos.position_name AS employee_position
      FROM projects p
      LEFT JOIN employees e ON p.id = e.project
      LEFT JOIN positions pos ON e.position = pos.id
      WHERE p.id = ${id}
  `);

    if (!projectWithEmployees.length) {
      throw new NotFoundError(`Project ${id} does not exist`);
    }
    const employeesByProject = {};
    projectWithEmployees.forEach((row) => {
      if (!employeesByProject[row.project_id]) {
        employeesByProject[row.project_id] = {
          id: row.project_id,
          name: row.project_name,
          contact_person: row.contact_person,
          contact_email: row.contact_email,
          is_active: !!row.is_active,
          employees: [],
        };
      }
      if (row.employee_id) {
        employeesByProject[row.project_id].employees.push({
          employee_id: row.employee_id,
          employee_first_name: row.employee_first_name,
          employee_last_name: row.employee_last_name,
          employee_position: row.employee_position,
        });
      }
    });

    return Object.values(employeesByProject)[0];
  }

  async addProject(projectData) {
    const { name, contact_person, contact_email } = projectData;

    if (!name || !contact_person || !contact_email) {
      throw new InvalidParamError("Required fields are missing");
    }

    const insertProjectSql = `
    INSERT INTO projects (name, contact_person, contact_email)
    VALUES ('${name}', '${contact_person}', '${contact_email}')
  `;
    const { insertId } = await this._executeSqlQuery(insertProjectSql);

    return await this.getPreparedProjectById(insertId);
  }

  async updateProject(id, updatedData) {
    const project = await this._getProjectById(id);

    const proceedData = {
      ...project,
      ...updatedData,
    };

    const updateProjectSql = `
    UPDATE projects
    SET name = '${proceedData.name}', 
        contact_person = '${proceedData.contact_person}',
        contact_email = '${proceedData.contact_email}', 
        is_active = ${proceedData.is_active ? 1 : 0}
    WHERE id = ${id}
  `;

    if (!proceedData.is_active) {
      const updateEmployeesSql = `
        UPDATE employees
        SET project = NULL
        WHERE project = ${id}
      `;
      await this._executeSqlQuery(updateEmployeesSql);
    }

    await this._executeSqlQuery(updateProjectSql);
    return await this.getPreparedProjectById(id);
  }

  async getPositionsList() {
    const selectPositionsSql = `
    SELECT
      p.id,
      p.position_name,
      p.salary_limit,
      p.head,
      e.id as employee_id,
      e.first_name as employee_first_name,
      e.last_name as employee_last_name,
      COUNT(emp.id) as total_employees
    FROM positions p
    LEFT JOIN employees e ON p.head = e.id
    LEFT JOIN employees emp ON p.id = emp.position
    GROUP BY p.id
  `;

    const positions = await this._executeSqlQuery(selectPositionsSql);
    return positions.map((p) => ({
      id: p.id,
      position_name: p.position_name,
      salary_limit: p.salary_limit,
      head: p.head
        ? {
          employee_id: p.employee_id,
          employee_first_name: p.employee_first_name,
          employee_last_name: p.employee_last_name,
        }
        : null,
      total_employees: p.total_employees,
    }));
  }

  async _getPositionById(id) {
    const [position] = await this._executeSqlQuery(`
    SELECT * FROM positions p
    WHERE p.id = ${id}
    `);

    if (!position) {
      throw new NotFoundError(`Position ${id} does not exist`);
    }

    return position

  }

  async getPreparedPositionById(id) {
    const selectPositionSql = `
    SELECT
      p.id,
      p.position_name,
      p.salary_limit,
      p.head,
      e.id as employee_id,
      e.first_name as employee_first_name,
      e.last_name as employee_last_name,
      COUNT(emp.id) as total_employees
    FROM positions p
    LEFT JOIN employees e ON p.head = e.id
    LEFT JOIN employees emp ON p.id = emp.position
    WHERE p.id = ${id}
    GROUP BY p.id
  `;

    const [position] = await this._executeSqlQuery(selectPositionSql);
    if (!position) {
      throw new NotFoundError(`Position ${id} does not exist`);
    }
    return {
      id: position.id,
      position_name: position.position_name,
      salary_limit: position.salary_limit,
      head: position.head
        ? {
          employee_id: position.employee_id,
          employee_first_name: position.employee_first_name,
          employee_last_name: position.employee_last_name,
        }
        : null,
      total_employees: position.total_employees,
    };
  }

  async addPosition(positionData) {
    const { position_name, salary_limit, head = null } = positionData;

    if (!position_name || !salary_limit) {
      throw new InvalidParamError("Required fields are missing");
    }

    if (head) {
      await this._getEmployeeById(head);
    }

    const insertPositionSql = `
    INSERT INTO positions (position_name, salary_limit, head)
    VALUES ('${position_name}', '${salary_limit}', '${head}')
  `;
    const { insertId } = await this._executeSqlQuery(insertPositionSql);
    if (head) {
      await this.updateEmployee(head, { position: position_name });
    }
    return await this.getPreparedPositionById(insertId);
  }

  async updatePosition(id, updatedData) {
    const position = await this._getPositionById(id);

    const { head } = updatedData;

    if (head) {
      await this._getEmployeeById(head);
    }

    const proceedData = {
      ...position,
      ...updatedData,
    };

    const { position_name, salary_limit, head: headId } = proceedData;

    const updateProjectSql = `
   UPDATE positions
    SET position_name = '${position_name}',
        salary_limit = ${salary_limit},
        head = ${headId}
    WHERE id = ${id}
  `;
    await this._executeSqlQuery(updateProjectSql);

    if (head) {
      await this.updateEmployee(head, { position: position_name });
    }

    return await this.getPreparedPositionById(id);
  }

  async deletePosition(id) {
    const updateEmployeesSql = `
    UPDATE employees
    SET position = null
    WHERE position = ${id}
  `;

    await this._executeSqlQuery(updateEmployeesSql);

    const deletePositionSql = `
    DELETE FROM positions
    WHERE id = ${id}
  `;

    await this._executeSqlQuery(deletePositionSql);
  }
}

const db = new MySQLDB();

export default db;
