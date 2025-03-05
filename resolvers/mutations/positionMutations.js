import { prepareIntegerId } from "../../helpers.js";

const positionMutations = {
  addPosition: async (_, args, context) => {
    const { position_name, head, salary_limit } = args;

    const position = await context.prisma.position.create({
      data: {
        position_name,
        salary_limit,
        headId: head ? prepareIntegerId(head) : undefined,
      },
    });

    return position;
  },
  updatePosition: async (_, args, context) => {
    const {
      id: positionId,
      updatedData: { position_name, head, salary_limit },
    } = args;

    const position = await context.prisma.position.update({
      where: {
        id: prepareIntegerId(positionId),
      },
      data: {
        position_name,
        salary_limit,
        headId: head ? prepareIntegerId(head) : undefined,
      },
    });
    return position;
  },
  deletePosition: async (_, args, context) => {
    await context.prisma.position.delete({
      where: {
        id: prepareIntegerId(args.id),
      },
    });
    return true;
  },
};

export default positionMutations
