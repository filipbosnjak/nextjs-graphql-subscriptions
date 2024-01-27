// @ts-ignore
import {GraphqlContext} from "@/lib/types";

function newMessageSubscribe(parent: any, args: any, context: GraphqlContext, info: any) {
  console.log(context)
  return context.pubsub.subscribe('NEW_MSG');
}

export const newMessage = {
  subscribe: (arent: any, args: any, context: GraphqlContext, info: any) => {
    console.log(context)
    return context.pubsub.subscribe('NEW_MSG');
  },
/*  resolve: (payload: any) => {
    return payload
  },*/
}

