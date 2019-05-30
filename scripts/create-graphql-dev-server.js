const fs = require("fs");
const path = require("path");
const { ApolloServer, gql } = require("apollo-server");

const schema = fs.readFileSync(
  path.resolve(__dirname, "../src/graphql/schema.graphql"),
  "utf8"
);

const typeDefs = gql`
  ${schema}
`;

const resolvers = {
  Query: {}
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  GraphQL dev server ready at ${url}`);
});
