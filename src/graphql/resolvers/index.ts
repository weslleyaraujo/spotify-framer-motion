import { feed } from "./feed";
import { artist } from "./artist";
import { search } from "./search";
import { album } from "./album";
import { GQLResolvers } from "../generated";
import { genres } from "./genres";
import { song } from "./song";

const resolvers: Pick<GQLResolvers, "Query"> = {
  Query: {
    feed,
    artist,
    search,
    album,
    genres,
    song
  }
};

export { resolvers };
