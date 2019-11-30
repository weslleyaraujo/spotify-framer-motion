import ApolloClient from "apollo-boost";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "../graphql/fragment-types.json";
import { resolvers } from "./resolvers/index";

const cache = new InMemoryCache({
  addTypename: true
});
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

function createApolloClient() {
  return new ApolloClient({
    fragmentMatcher,
    clientState: {
      resolvers
    },
    cache
  });
}

export { createApolloClient };
