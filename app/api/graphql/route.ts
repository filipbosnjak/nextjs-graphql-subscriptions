// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createSchema, createYoga } from 'graphql-yoga'
import {log} from "next/dist/server/typescript/utils";
import {schema} from "@/app/api/graphql/schema";


const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: schema,
    resolvers: {
      Query: {
        greetings: () => 'This is the `greetings` field of the root `Query` type',
        users: () => {
          return [
            { id: '1', name: 'John Doe' },
            { id: '2', name: 'Jane Doe' }
          ]
        }
      },
      Mutation: {
        createUser: (parent, args) => {
          const { name } = args
          const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
          return { id, name }
        }
      }
    }
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: '/api/graphql',

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response }
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
