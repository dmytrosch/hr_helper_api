const Position = {
  total_employees: async (parent, _, context) => {
    return await context.prisma.employee.count({
      where: {
        positionId: parent.id,
      },
    });
  },
  head: async (parent, _, context) => {
    return await context.prisma.position
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .head();
  },
  employees: async (parent, _, context) => {
    return await context.prisma.position
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .employees();
  },
};

export default Position;
