const Employee = {
  headOfPositions: async (parent, args, context) => {
    return await context.prisma.employee
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .headOfPositions();
  },
  project: async (parent, args, context) => {
    return await context.prisma.employee
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .project();
  },
  position: async (parent, args, context) => {
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
