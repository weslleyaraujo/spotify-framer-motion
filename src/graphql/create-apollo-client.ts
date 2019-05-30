import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();

function createApolloClient() {
  return new ApolloClient({
    cache
  });
}

export { createApolloClient };
