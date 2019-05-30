const fs = require("fs");
const path = require("path");
const gql = require("graphql-tag");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { SchemaLink } = require("apollo-link-schema");
const { ApolloClient } = require("apollo-client");
const { makeExecutableSchema } = require("graphql-tools");
const { introspectionQuery } = require("graphql");

const resolverValidationOptions = {
  requireResolversForResolveType: false
};

const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync(
    path.resolve(__dirname, "../src/graphql/schema.graphql"),
    "utf8"
  ),
  resolverValidationOptions
});

const client = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      ${introspectionQuery}
    `
  })
  .then(result => {
    fs.writeFileSync(
      "./src/graphql/schema.json",
      JSON.stringify(result.data, null, 2),
      "utf-8"
    );
  })
  .catch(e => {
    console.error("Error", e);
  });
