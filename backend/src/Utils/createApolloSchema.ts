import { buildSchema } from "type-graphql"
import { join } from "path"


export const createApolloSchema = async (): Promise<any> =>
  await buildSchema({
    resolvers: [join(__dirname, "../resolvers/*Resolver.ts")],
    authChecker: ({ context }) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return !!context.user
    }
  })
