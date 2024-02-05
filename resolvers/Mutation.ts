import {GraphqlContext} from "@/lib/types";
import {NewMessageSubscription} from "@/src/gql/graphql";

export type Message = {
  body: string;
  from: string;
}

export const sendMessage = async (parent: any, args: any, context: GraphqlContext) => {
  const message: Message = {
    body: args.message,
    from: "USER",
  };

  console.log("Publishing NEW_MSG: ", message);
  const newMessage: NewMessageSubscription = {
    __typename: "Subscription",
    newMessage: {
      __typename: "Message",
      body: message.body,
    }
  }

  context.pubsub.publish("NEW_MSG", newMessage);





  return "Message sent";
}
