import ApolloClient from "apollo-boost";
import { Resolvers } from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "../graphql/fragment-types.json";
import { resolvers } from "./resolvers/index";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({
  addTypename: true,
  fragmentMatcher
});

function createApolloClient() {
  return new ApolloClient({
    clientState: {
      resolvers: resolvers as Resolvers
    },
    cache
  });
}

export { createApolloClient };
