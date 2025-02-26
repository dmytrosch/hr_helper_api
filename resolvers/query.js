import { prepareIntegerId } from "../helpers.js";

const Query = {
  positions: async (_, args, context) => {
    return await context.prisma.position.findMany();
  },
  position: async (_, { id }, context) => {
    const position = await context.prisma.position.findUnique({
      where: {
        id: prepareIntegerId(id),
      },
    });
    return position;
  },
  employees: async (_, __, context) => {
    return await context.prisma.employee.findMany();
  },
  employee: async (_, { id }, context) => {
    return await context.prisma.employee.findUnique({
      where: {
        id: prepareIntegerId(id),
      },
    });
  },

  projects: async (_, __, context) => {
    return await context.prisma.project.findMany()
  },
  project: async (_, { id }, context) => {
    return await context.prisma.project.findUnique({
      where: {
        id: prepareIntegerId(id)
      }
    })
  }
};

export default Query;
