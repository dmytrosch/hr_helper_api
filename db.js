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

  async executeSQLQuery(sql) {
    try {
      const [rows] = await this.pool.query(sql);
      return rows;
    } catch (error) {
      console.error("Error executing query:", error);
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
    return employee;
  }

  async getPositionByName(positionName) {
    const positionSql = `SELECT * FROM positions WHERE position_name = '${positionName}'`;
    const [position] = await this.executeSQLQuery(positionSql);
    return position;
  }

  async getProjectByName(projectName) {
    const projectSql = `SELECT * FROM projects WHERE name = '${projectName}'`;
    const [project] = await this.executeSQLQuery(projectSql);
    return project;
  }

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
    const positionResult = await this.getPositionByName(position);
    if (!positionResult) {
      throw new InvalidParamError("Position does not exist");
    }

    const projectResult = await this.getProjectByName(project);
    if (!projectResult) {
      throw new InvalidParamError("Project does not exist");
    }
    const insertEmployeeSql = `
    INSERT INTO employees (first_name, last_name, email, phone, city, birthday, position, join_date, project)
    VALUES ('${first_name}', '${last_name}', '${email}', '${phone}', '${city}', '${formatDate(
      birthday
    )}', ${positionResult.id}, '${formatDate(join_date)}', ${projectResult.id})
  `;

    const { insertId } = await this.executeSQLQuery(insertEmployeeSql);

    const employee = await this.getEmployeeById(insertId);

    return employee;
  }

  async updateEmployee(id, updatedData) {
    const employee = await this.getEmployeeById(id);

    const { position, project } = updatedData;

    const proceedData = {
      ...employee,
      ...updatedData,
    };

    const positionResult = await this.getPositionByName(
      position || employee.position
    );
    if (!positionResult) {
      throw new InvalidParamError("Position does not exist");
    }
    proceedData.position = positionResult.id;

    const projectResult = await this.getProjectByName(
      project || employee.project
    );
    if (!projectResult) {
      throw new InvalidParamError("Project does not exist");
    }
    proceedData.project = projectResult.id;

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
    return await this.getEmployeeById(id);
  }

  async deleteEmployee(id) {
    const deleteSql = `DELETE FROM employees
     WHERE id = ${id}`;

    try {
      await this.executeSQLQuery(deleteSql);
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
    const projects = await this.executeSQLQuery(selectProjectsSql);
    return projects.map((p) => {
      const project = { ...p };
      if (project.is_active !== undefined) {
        project.is_active = !!project.is_active;
      }
      return project;
    });
  }

  async getProjectById(id) {
    const projectWithEmployees = await this.executeSQLQuery(`
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
    const { insertId } = await this.executeSQLQuery(insertProjectSql);

    return await this.getProjectById(insertId);
  }

  async updateProject(id, updatedData) {
    const project = await this.getProjectById(id);

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
      await this.executeSQLQuery(updateEmployeesSql);
    }

    await this.executeSQLQuery(updateProjectSql);
    return await this.getProjectById(id);
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

    const positions = await this.executeSQLQuery(selectPositionsSql);
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

  async getPositionById(id) {
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

    const [position] = await this.executeSQLQuery(selectPositionSql);
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
      await this.getEmployeeById(head);
    }

    const insertPositionSql = `
    INSERT INTO positions (position_name, salary_limit, head)
    VALUES ('${position_name}', '${salary_limit}', '${head}')
  `;
    const { insertId } = await this.executeSQLQuery(insertPositionSql);
    if (head) {
      await this.updateEmployee(head, { position: position_name });
    }
    return await this.getPositionById(insertId);
  }

  async updatePosition(id, updatedData) {
    const position = await this.getPositionById(id);

    const { head } = updatedData;

    if (head) {
      await this.getEmployeeById(head);
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
    await this.executeSQLQuery(updateProjectSql);

    if (head) {
      await this.updateEmployee(head, { position: position_name });
    }

    return await this.getPositionById(id);
  }

  async deletePosition(id) {
    const updateEmployeesSql = `
    UPDATE employees
    SET position = null
    WHERE position = ${id}
  `;

    await this.executeSQLQuery(updateEmployeesSql);

    const deletePositionSql = `
    DELETE FROM positions
    WHERE id = ${id}
  `;

    await this.executeSQLQuery(deletePositionSql);
  }
}

const db = new MySQLDB();

export default db;
