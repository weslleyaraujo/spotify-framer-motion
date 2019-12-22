import albums from "../../data/albums.json";
import { GQLQueryResolvers } from "../generated";

const album: GQLQueryResolvers["album"] = (parent, { id }, context) => {
  const item = albums.find(item => item.id === id);
  if (!item) {
    throw new Error(`Could not find album with id ${id}`);
  }

  const { cover, name, artists, songs } = item;
  return {
    __typename: "Album",
    name,
    cover,
    artist: artists[0],
    id,
    songs
  };
};

export { album };
