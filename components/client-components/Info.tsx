"use client"

import React, {useEffect} from 'react';
import {ApolloProvider, gql, HttpLink, split} from "@apollo/client";
import {
  SendMessageMutationVariables,
  useInfoQuery,
  useSendMessageMutation
} from "@/src/gql/graphql";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {gqlClient} from "@/components/GraphqlClient";

export const base = 'http://localhost:3000';


export type InfoProps = {
}

const NEW_MESSAGE_SUBSCRIPTION = `subscription{newMessage{body}}`

const Info = (props: InfoProps) => {
  const res = useInfoQuery()
  const [message, setMessage] = React.useState<string>("")
  const [mutateFunction, { data, loading, error }] = useSendMessageMutation({variables: {message}})
  const [reconnect, setReconnect] = React.useState<number>(0);

  const [subData, setSubData] = React.useState<any>(null);

  useEffect(() => {

  }, []);


  useEffect(() => {

    console.log('EventSource url:', url.toString());
    const eventSource = new EventSource(url.toString());
    console.log("creating the event source")

    eventSource.onmessage = (event) => {
      console.log('EventSource message:', event)
      const data = JSON.parse(event.data);
      console.log(data);
      setSubData(data)
    };


    eventSource.onerror = (event) => {
      console.log('EventSource failed:', event);
      setReconnect(prevState => prevState+1);
    };

    setTimeout(() => setReconnect(prevState => prevState+1), 5000);

    return () => {
      eventSource.close();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <pre>{JSON.stringify(subData, null, 2)}</pre>
    </>
 );}

export default () =>   {
    return (
      <ApolloProvider client={gqlClient}>
        <Info />
      </ApolloProvider>
    )

}
