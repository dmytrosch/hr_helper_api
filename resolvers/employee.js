const Employee = {
  headOfPositions: async (parent, _, context) => {
    return await context.prisma.employee
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .headOfPositions();
  },
  project: async (parent, _, context) => {
    return await context.prisma.employee
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .project();
  },
  position: async (parent, _, context) => {
    return await context.prisma.employee
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .position();
  }
}

export default Employee;
