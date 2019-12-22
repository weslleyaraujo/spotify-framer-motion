import { feed } from "./feed";
import { artist } from "./artist";
import { search } from "./search";
import { album } from "./album";
import { GQLResolvers } from "../generated";

const resolvers: Pick<GQLResolvers, "Query"> = {
  Query: {
    feed,
    artist,
    search,
    album
  }
};

export { resolvers };
