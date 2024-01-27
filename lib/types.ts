import {PubSub} from "graphql-yoga";
import {PubSubPublishArgsByKey} from "@/app/api/graphql/route";


export type GraphqlContextt = { pubsub: PubSub<PubSubPublishArgsByKey> }

