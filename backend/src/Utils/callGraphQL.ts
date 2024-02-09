import { ApolloServer,  } from "apollo-server";
import { createApolloSchema } from "../Utils/createApolloSchema";
import { GraphQLRequest, GraphQLResponse, ContextFunction } from "apollo-server-core";
import { apolloContext } from "./apolloContext";

export async function callGraphQL(
  request: Omit<GraphQLRequest, "query"> & {
    query?: string;
  },
  token?: string
): Promise<GraphQLResponse> {
  let context: ContextFunction = apolloContext;
  if (token !== undefined) {
    context = () => apolloContext({ req: { headers: { authorization: "Bearer " +token } }, res: {} }) as unknown as ContextFunction;
  }

  const schema = await createApolloSchema();
  const testServer = new ApolloServer({ schema, context });

  return await testServer.executeOperation(request);
}
