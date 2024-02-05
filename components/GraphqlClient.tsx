"use client"

import React from 'react';
import {ApolloClient, InMemoryCache} from "@apollo/client";

export const gqlClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});



export type GraphqlClientProps = {
}

const GraphqlClient = (props: GraphqlClientProps) => {

 return (
    <>

    </>
 );}

export default GraphqlClient;
