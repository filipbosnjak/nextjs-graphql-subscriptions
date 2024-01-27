// @ts-ignore
import {GraphqlContextt} from "@/lib/types";

function newMessageSubscribe(parent: any, args: any, context: GraphqlContextt, info: any) {
  console.log(context)
  return context.pubsub.subscribe('NEW_MSG');
}

export const newMessage = {
  subscribe: (arent: any, args: any, context: GraphqlContextt, info: any) => {
    console.log(context)
    return context.pubsub.subscribe('NEW_MSG');
  },
/*  resolve: (payload: any) => {
    return payload
  },*/
}

