/*
const { createServer } = require('http')
const { WebSocketServer } = require('ws')
const { createYoga, createSchema } = require('graphql3-yoga')
const { useServer } = require('graphql3-ws/lib/use/ws')
const { parse } = require('url')
const next = require('next')
const {PubSub} = require("graphql3-subscriptions")

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 9091

// prepare nextjs
const app = next({ dev, hostname, port })

// match the route next would use if yoga was in `pages/api/graphql3.ts`
const graphqlEndpoint = '/api/graphql3'

export type PubSub = {
  publish(triggerName: string, payload: any): Promise<void>;
  subscribe(triggerName: string, onMessage: (...args: any[]) => void): Promise<number>;
  unsubscribe(subId: number): void;
}

const pubsub: PubSub = new PubSub();

type Message = {
  message: String
}

type MessageInput = {
  body: string
}

// prepare yoga
const yoga = createYoga({
    graphqlEndpoint,
    graphiql: {
      subscriptionsProtocol: 'WS'
    },
    schema: createSchema({
      typeDefs: /!* GraphQL *!/ `
        type Query {
          hello: String!
        }
        type Mutation {
          sendMessage(message: String!): String!
        }
        type Subscription {
          messages: String
        }
      `,
      resolvers: {
        Query: {
          hello: () => 'world'
        },
        Mutation: {
          sendMessage: (parent: unknown, args: MessageInput, context: any) => {
            const {body} = args;
            console.log("body: ", body)
            const message: Message = {
              message: body
            }
            pubsub.publish("MESSAGE", message)
            console.log(message)
            return message;
          }
        },
        Subscription: {
          messages: {
            subscribe: () => pubsub.asyncIterator(["MESSAGE"])
          }
        }
      }
    })
  })

;(async () => {
  await app.prepare()
  const handle = app.getRequestHandler()

  // create http server
  const server = createServer(async (req: any, res: any) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const url = parse(req.url, true)

      if (url?.pathname?.startsWith(graphqlEndpoint)) {
        await yoga(req, res)
      } else {
        await handle(req, res, url)
      }
    } catch (err) {
      console.error(`Error while handling ${req.url}`, err)
      res.writeHead(500).end()
    }
  })

  // create websocket server
  const wsServer = new WebSocketServer({ server, path: graphqlEndpoint })

  // prepare graphql3-ws
  useServer(
    {
      // @ts-ignore
      execute: (args) => args.rootValue.execute(args),
      // @ts-ignore
      subscribe: (args) => args.rootValue.subscribe(args),
      onSubscribe: async (ctx: { extra: { request: any; socket: any } }, msg: { payload: { operationName: any; query: any; variables: any } }) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } = yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload
        })

        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe
          }
        }

        const errors = validate(args.schema, args.document)
        if (errors.length) return errors
        return args
      }
    },
    wsServer
  )

  await new Promise<void>((resolve, reject) =>
    // @ts-ignore
    server.listen(port, (err: any) => (err ? reject(err) : resolve()))
  )

  console.log(`
> App started!
  HTTP server running on http://${hostname}:${port}
  GraphQL WebSocket server running on ws://${hostname}:${port}${graphqlEndpoint}
`)
})()
*/
