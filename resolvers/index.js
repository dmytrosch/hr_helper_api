import Employee from "./employee.js";
import Mutation from "./mutation.js";
import Position from "./position.js";
import Project from "./project.js";
import Query from "./query.js";

const resolvers = {
  Position,
  Query,
  Employee,
  Project,
  Mutation
};

export default resolvers;
