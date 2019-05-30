module.exports = {
  client: {
    service: {
      name: "flashcards",
      service: "example"
    },
    engine: {
      endpoint: "http://localhost:4000/graphql"
    }
    includes: ["src/**/*.@(ts|tsx)"],
    excludes: ["node_modules/**"]
  }
};
