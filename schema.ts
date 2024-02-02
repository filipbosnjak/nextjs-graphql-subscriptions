import {gql} from "@apollo/client";


export const schema = gql`
  type Query {
    info: String
  }

  type Mutation {
    sendMessage(message: String!): String!
  }

  type Subscription {
    newMessage: Message}

  type Message {
    body: String
    from: String
  }

`;
