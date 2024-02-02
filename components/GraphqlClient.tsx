"use client"

import {ApolloClient, ApolloLink, HttpLink, InMemoryCache, split} from "@apollo/client";
import React from 'react';
import {ServerSentEventsLink} from "@graphql-sse/apollo-client";
import {onError} from "@apollo/client/link/error";
import {getOperationAST} from "graphql/index";

const uri = 'http://localhost:3000/api/graphql'
const wsUri = 'http://localhost:3000/api/graphql'
const sseLink = new ServerSentEventsLink({
  graphQlSubscriptionUrl: wsUri,
});
const httpLink = new HttpLink({ uri })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

const link = split(
  ({ query, operationName }) => {
    const definition = getOperationAST(query, operationName)
    console.log("seerver")
    return (
      definition?.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  sseLink,
  httpLink,
)

export const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, link]),
  connectToDevTools: true,
});



export type GraphqlClientProps = {
}

const GraphqlClient = (props: GraphqlClientProps) => {

 return (
    <>

    </>
 );}

export default GraphqlClient;
