import { prepareIntegerId } from "../../helpers.js";

const employeeMutations = {
  addEmployee: async (_, { employee }, context) => {
    const {
      first_name,
      last_name,
      email,
      phone,
      city,
      birthday,
      position,
      join_date,
      project,
    } = employee;

    const createdEmployee = await context.prisma.employee.create({
      data: {
        first_name,
        last_name,
        email,
        phone,
        city,
        birthday: new Date(birthday),
        positionId: prepareIntegerId(position),
        join_date: join_date ? new Date(join_date) : new Date(),
        projectId: project ? prepareIntegerId(project) : undefined,
      },
    });
    return createdEmployee;
  },

  updateEmployee: async (_, args, context) => {
    const {
      id: employeeId,
      updatedData: {
        first_name,
        last_name,
        email,
        phone,
        city,
        birthday,
        position,
        join_date,
        project,
      },
    } = args;

    const employee = await context.prisma.employee.update({
      where: {
        id: prepareIntegerId(employeeId),
      },
      data: {
        first_name,
        last_name,
        email,
        phone,
        city,
        birthday: birthday ? new Date(birthday) : undefined,
        positionId: position ? prepareIntegerId(position) : undefined,
        join_date: join_date ? new Date(join_date) : undefined,
        projectId: project ? prepareIntegerId(project) : undefined,
      },
    });

    return employee;
  },

  deleteEmployee: async (_, args, context) => {
    await context.prisma.employee.delete({
      where: {
        id: prepareIntegerId(args.id),
      },
    });

    return true;
  },
};

export default employeeMutations;
