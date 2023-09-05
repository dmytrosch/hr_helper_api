import { NotFoundError } from "../errors.js";
import positionsServices from "./positions.js";
import projectsServices from "./projects.js";
import { formatDate } from "../helpers.js";
import db from "../db.js";

class EmployeesServices {
  async getEmployeesList() {
    const employees = await db.executeSqlQuery(`
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

  async getEmployeeByIdOrFail(id) {
    const [employee] = await db.executeSqlQuery(`
    SELECT * from employees e
    WHERE e.id = ${id}
    `);

    if (!employee) {
      throw new NotFoundError(`Employee ${id} does not exist`);
    }

    return employee;
  }

  async getPreparedEmployeeById(id) {
    const [employee] = await db.executeSqlQuery(`
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
      await positionsServices.getPositionByIdOrFail(position);
    }
    if (project) {
      await projectsServices.getProjectByIdOrFail(project);
    }

    const insertEmployeeSql = `
    INSERT INTO employees (first_name, last_name, email, phone, city, birthday, position, join_date, project)
    VALUES ('${first_name}', '${last_name}', '${email}', '${phone}', '${city}', '${formatDate(
      birthday
    )}', ${position}, '${formatDate(join_date)}', ${project})
  `;

    const { insertId } = await db.executeSqlQuery(insertEmployeeSql);

    const employee = await this.getPreparedEmployeeById(insertId);

    return employee;
  }

  async updateEmployee(id, updatedData) {
    const employee = await this.getEmployeeByIdOrFail(id);

    const { position, project } = updatedData;

    if (position) {
      await positionsServices.getPositionByIdOrFail(position);
    }
    if (project) {
      await projectsServices.getProjectByIdOrFail(project);
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

    await db.executeSqlQuery(updateSql);
    return await this.getPreparedEmployeeById(id);
  }

  async deleteEmployee(id) {
    await this.getEmployeeByIdOrFail(id);

    const updatePositionsSql = `
    UPDATE positions
    SET head = null
    WHERE head = ${id}`;

    await db.executeSqlQuery(updatePositionsSql);

    const deleteSql = `DELETE FROM employees
     WHERE id = ${id}`;

    try {
      await db.executeSqlQuery(deleteSql);
    } catch (error) {
      throw new NotFoundError(`Employee ${id} does not exist`);
    }
  }
}

const employeesServices = new EmployeesServices();

export default employeesServices;
