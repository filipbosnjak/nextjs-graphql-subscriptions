import {HttpLink, split} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {ServerSentEventsLink} from "@graphql-sse/apollo-client";

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/api/graphql',
});
console.log("serverrr")

const sseLink = new ServerSentEventsLink({
  graphQlSubscriptionUrl: 'http://localhost:3000/api/graphql',
});

export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  sseLink,
  httpLink
);
