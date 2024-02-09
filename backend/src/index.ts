import { ApolloServer } from "apollo-server";
import dataSource from "./Utils/dataSource";
import { config } from "dotenv";
import { createApolloSchema } from "./Utils/createApolloSchema";
import { apolloContext } from "./Utils/apolloContext";
import { getRuntimes } from "./services/Piston.service";


config();

const start = async (): Promise<void> => {

  await dataSource.initialize();
  await getRuntimes();

  const schema = await createApolloSchema();
  const server = new ApolloServer({
    schema,
    context: apolloContext,
  });
  try {
    const { url } = await server.listen({ port: 5000 });
    console.log(`Server ready at ${url}`);
  } catch {
    console.log("Error starting the server");
  }
};
void start();
