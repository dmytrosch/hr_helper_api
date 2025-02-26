const Position = {
  total_employees: async (parent, _, context) => {
    const count = await context.prisma.employee.count({
      where: {
        positionId: parent.id,
      },
    });

    return count;
  },
  head: async (parent, _, context) => {
    const head = await context.prisma.position
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .head();
    return head
  },
  employees: async (parent, _, context) => {
    return await context.prisma.employee.findMany({
      where: {
        positionId: parent.id,
      },
    });
  },
};

export default Position;
