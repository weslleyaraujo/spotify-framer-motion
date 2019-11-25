import { resolver as feed } from "./feed";
import { resolver as AlbumItem } from "./album-item";
import { Resolvers } from "apollo-boost";

const resolvers: Resolvers = {
  // @ts-ignore
  Query: {
    ...feed
  },

  // @ts-ignore
  ...AlbumItem
};

export { resolvers };
