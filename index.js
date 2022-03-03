import { GraphQLServer } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';
import Query from './src/resolvers/Query';
import Mutation from './src/resolvers/Mutation';

const prisma = new PrismaClient();
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation
  },
  context(request) {
    return {
      prisma,
      request
    }
  },
})

const options = {
  port: 8000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}
server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests. click here for explore http://localhost:8000/playground`,
  ),
)