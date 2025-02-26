const Project = {
  employees: async (parent, _, context) => {
    return await context.prisma.project
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .employees();
  }
};

export default Project;
