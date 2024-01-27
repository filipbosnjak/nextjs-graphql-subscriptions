import {GraphqlContextt} from "@/lib/types";

export type Message = {
  body: string;
  from: string;
}

export const sendMessage = async (parent: any, args: any, context: GraphqlContextt) => {
  const message: Message = {
    body: args.message,
    from: "USER",
  };

  console.log("Publishing NEW_MSG: ", message);

  context.pubsub.publish("NEW_MSG", {
    newMessage: message,
  });
  return "Message sent";
}
