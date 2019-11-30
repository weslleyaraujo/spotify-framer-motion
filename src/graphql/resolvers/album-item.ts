import { GQLResolvers } from "../generated";
import uuid from "uuid/v1";

interface Resolver extends Pick<GQLResolvers, "AlbumItem"> {}

const resolver: Resolver = {
  AlbumItem: {
    artist: () => "example",
    cover: () => ({
      __typename: "Image",
      url: "example"
    }),
    songs: () => [],
    id: (a, b, c) => {
      console.log({ a, b, c });
      return uuid();
    },
    name: (a, b, c) => {
      console.log({ a, b, c });
      return "foo";
    }
  }
};

export { resolver };
