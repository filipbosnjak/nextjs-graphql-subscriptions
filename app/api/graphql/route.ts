import {createPubSub, createSchema, createYoga, PubSub} from 'graphql-yoga';
import * as Query from '@/resolvers/Query';
import * as Mutation from '@/resolvers/Mutation';
import * as Subscription from '@/resolvers/Subscription';
import type {NextApiRequest, NextApiResponse} from 'next'
import {schema} from "@/schema";

export type PubSubPublishArgsByKey = {
  [key: string]: [] | [any] | [number | string, any];
};

const pubsub: PubSub<PubSubPublishArgsByKey> = createPubSub();

const resolvers = {
  Query,
  Mutation,
  Subscription,
};

const {handleRequest} =  createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  graphqlEndpoint: '/api/graphql',
  /* @ts-ignore */
  schema: createSchema({
    typeDefs: schema,
    resolvers,
  }),
  context: ({req}) => {
    return {
      req,
      pubsub,
      userId:
        req && req.headers.authorization
          ? ""
          : null
    };
  },
  cors: false
});

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
