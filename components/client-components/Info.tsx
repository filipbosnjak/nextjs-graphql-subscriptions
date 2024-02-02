"use client"

import React, {useEffect} from 'react';
import {ApolloProvider} from "@apollo/client";
import {
  SendMessageMutationVariables,
  useInfoQuery,
  useNewMessageSubscription,
  useSendMessageMutation
} from "@/src/gql/graphql";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {client} from "@/components/GraphqlClient";


export type InfoProps = {
}

const Info = (props: InfoProps) => {
  const res = useInfoQuery()
  const [message, setMessage] = React.useState<string>("")
  const [mutateFunction, { data, loading, error }] = useSendMessageMutation({variables: {message}})
  const subRes = useNewMessageSubscription()
  useEffect(() => {
    console.log("subRes", subRes.data?.newMessage?.body)
  }, [subRes.data])
  return (
    <>
      {res.data?.info}
      <Input value={message} onChange={(e) => {
        setMessage(e.target.value)
      }} />
      <Button className="w-20" onClick={async () => {
        console.log("client sendning")
        const messageVars: SendMessageMutationVariables = {message}
        const res = await mutateFunction({variables: messageVars})
        console.log(res.data?.sendMessage)
      }}>Send</Button>
      <div>
{/*
        New Message: {subData?.newMessage?.body}
*/}
      </div>
    </>
 );}

export default () =>     <ApolloProvider client={client}>
  <Info />
</ApolloProvider>
