import {TypeSource} from "@graphql-tools/utils";
import {IExecutableSchemaDefinition} from "@graphql-tools/schema";

export const schema =
/* GraphQL */
`
  type User {
    id: ID!
    name: String!
  }
  type Query {
    greetings: String
    users: [User!]!
  }
  type Mutation {
    createUser(name: String!): User!
  }
`

export type User = {
  id: string
  name: string
}

/*    "@types/ws": "^7.4.0",
    "@types/graphql-yoga": "^1.18.0",
    "@types/graphql-ws": "^0.14.0",
    "@types/next": "^10.0.11"*/
