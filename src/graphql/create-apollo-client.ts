import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { resolvers } from "./resolvers";
const cache = new InMemoryCache();

function createApolloClient() {
  return new ApolloClient({
    clientState: {
      resolvers
    },
    cache
  });
}

export { createApolloClient };
