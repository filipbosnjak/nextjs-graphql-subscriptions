"use client"

import React, {useEffect} from 'react';
import {ApolloProvider} from "@apollo/client";
import {
  NewMessageSubscription,
  SendMessageMutationVariables,
  useInfoQuery,
  useSendMessageMutation
} from "@/src/gql/graphql";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {gqlClient} from "@/components/GraphqlClient";
import {useSSESubscription} from "@/client-ops/Subscriptions";

export const base = process.env.NODE_ENV === "development" ? 'http://localhost:3000': 'https://nextgql-bqkhkcvura-oc.a.run.app/' ;


export type InfoProps = {
}

const NEW_MESSAGE_SUBSCRIPTION = `subscription{newMessage{body}}`

const Info = (props: InfoProps) => {
  const res = useInfoQuery()
  const [message, setMessage] = React.useState<string>("")
  const [mutateFunction, { data, loading, error }] = useSendMessageMutation({variables: {message}})
  const [reconnect, setReconnect] = React.useState<number>(0);

  const [subData, setSubData] = React.useState<NewMessageSubscription | null>(null);

  useEffect(() => {

  }, []);


  useEffect(() => {
    useSSESubscription<NewMessageSubscription>(NEW_MESSAGE_SUBSCRIPTION, (data) => {
      console.log("new message lalalla", data)
      setSubData(data)
    })
  }, []);

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
      New Message: <pre>{subData?.newMessage?.body}</pre>
      heyy  as
    </>
 );}

export default () =>   {
    return (
      <ApolloProvider client={gqlClient}>
        <Info />
      </ApolloProvider>
    )

}
