import { feed } from "./feed";
import { artist } from "./artist"
import { GQLResolvers } from "../generated";

const resolvers: Pick<GQLResolvers, "Query"> = {
  Query: {
    feed,
    artist
  }
};

export { resolvers };
