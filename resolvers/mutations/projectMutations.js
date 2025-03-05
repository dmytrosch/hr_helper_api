import { prepareIntegerId } from "../../helpers.js";

const projectMutations = {
  addProject: async (_, args, context) => {
    const {
      project: { name, contact_person, contact_email },
    } = args;

    const project = await context.prisma.project.create({
      data: {
        name,
        contact_person,
        contact_email,
      },
    });

    return project;
  },

  updateProject: async (_, args, context) => {
    const {
      id: projectId,
      updatedData: { name, contact_person, contact_email, isActive },
    } = args;

    const project = await context.prisma.project.update({
      where: {
        id: prepareIntegerId(projectId),
      },
      data: {
        name,
        contact_person,
        contact_email,
        isActive,
      },
    });

    return project;
  },

  deleteProject: async (_, args, context) => {
    await context.prisma.project.delete({
      where: {
        id: prepareIntegerId(args.id),
      },
    });
    return true;
  },
};

export default projectMutations;
