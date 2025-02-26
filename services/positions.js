import db from "../db.js";
import { NotFoundError, InvalidParamError } from "../errors.js";
import employeesServices from "./employees.js";

class PositionsServices {
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

    const positions = await db.executeSqlQuery(selectPositionsSql);
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

  async getPositionByIdOrFail(id) {
    const [position] = await db.executeSqlQuery(`
    SELECT * FROM positions p
    WHERE p.id = ${id}
    `);

    if (!position) {
      throw new NotFoundError(`Position ${id} does not exist`);
    }

    return position;
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

    const [position] = await db.executeSqlQuery(selectPositionSql);
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
      await employeesServices.getEmployeeByIdOrFail(head);
    }

    const insertPositionSql = `
    INSERT INTO positions (position_name, salary_limit, head)
    VALUES (?, ?, ?)
  `;
    const values = [position_name, salary_limit, head];
    const { insertId } = await db.executeSqlQuery(insertPositionSql, values);

    return await this.getPreparedPositionById(insertId);
  }

  async updatePosition(id, updatedData) {
    const position = await this.getPositionByIdOrFail(id);

    const { head } = updatedData;

    if (head) {
      await employeesServices.getEmployeeByIdOrFail(head);
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
    await db.executeSqlQuery(updateProjectSql);

    return await this.getPreparedPositionById(id);
  }

  async deletePosition(id) {
    await this.getPositionByIdOrFail(id);

    const updateEmployeesSql = `
    UPDATE employees
      SET position = null
    WHERE position = ${id}
  `;

    await db.executeSqlQuery(updateEmployeesSql);

    const deletePositionSql = `
    DELETE FROM positions
    WHERE id = ${id}
  `;

    await db.executeSqlQuery(deletePositionSql);
  }
}

const positionsServices = new PositionsServices();

export default positionsServices;
