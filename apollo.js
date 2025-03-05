import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import resolvers from "./resolvers/index.js";

const prisma = new PrismaClient();
const typeDefs = fs.readFileSync(path.resolve("./schema.graphql"), "utf-8");

async function startApolloServer(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      prisma,
    },
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault]
  });

  await server.start();

  server.applyMiddleware({ app });
}

export default startApolloServer;
