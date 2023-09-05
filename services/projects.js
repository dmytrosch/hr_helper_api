import { ACTIVE_PROJECTS_FILTER, INACTIVE_PROJECTS_FILTER } from "../constants.js";
import db from "../db.js";
import { NotFoundError, InvalidParamError } from "../errors.js";

class ProjectsServices {
  async getProjectsList(filter) {
    let selectProjectsSql = `
    SELECT id, name, contact_person, contact_email, is_active
    FROM projects
    `;
    if (filter === ACTIVE_PROJECTS_FILTER) {
      selectProjectsSql = `
    SELECT id, name, contact_person, contact_email
    FROM projects
    WHERE is_active = 1`;
    }
    if (filter === INACTIVE_PROJECTS_FILTER) {
      selectProjectsSql = `
    SELECT id, name, contact_person, contact_email
    FROM projects
    WHERE is_active = 0`;
    }
    const projects = await db.executeSqlQuery(selectProjectsSql);
    return projects.map((p) => {
      const project = { ...p };
      if (project.is_active !== undefined) {
        project.is_active = !!project.is_active;
      }
      return project;
    });
  }

  async getProjectById(id) {
    const [project] = await db.executeSqlQuery(`
      SELECT * FROM projects
      WHERE id = ${id}
  `);
    if (!project) {
      throw new NotFoundError(`Project ${id} does not exist`);
    }

    return project;
  }

  async getPreparedProjectById(id) {
    const projectWithEmployees = await db.executeSqlQuery(`
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
    const { insertId } = await db.executeSqlQuery(insertProjectSql);

    return await this.getPreparedProjectById(insertId);
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
      await db.executeSqlQuery(updateEmployeesSql);
    }

    await db.executeSqlQuery(updateProjectSql);
    return await this.getPreparedProjectById(id);
  }
}

const projectsServices = new ProjectsServices();

export default projectsServices;
