import { feed } from "./feed";
import { GQLResolvers } from "../generated";
const resolvers: Pick<GQLResolvers, "Query"> = {
  Query: {
    feed
  }
};

export { resolvers };
