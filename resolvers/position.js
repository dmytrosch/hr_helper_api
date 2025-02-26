const Position = {
  total_employees: async (parent, args, context) => {
    const count = await context.prisma.employee.count({
      where: {
        positionId: parent.id,
      },
    });

    return count;
  },
  head: async (parent, args, context) => {
    const head = await context.prisma.position
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .head();
    return head
  },
  employees: async (parent, args, context) => {
    return await context.prisma.employee.findMany({
      where: {
        positionId: parent.id,
      },
    });
  },
};

export default Position;
