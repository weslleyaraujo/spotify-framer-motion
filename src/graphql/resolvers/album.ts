import albums from "../../data/albums.json";
import { GQLQueryResolvers } from "../generated";
import { song as songResolver } from "./song";
const song = songResolver as Function;

const album: GQLQueryResolvers["album"] = (parent, { id }, context) => {
  const item = albums.find(item => item.id === id);
  if (!item) {
    throw new Error(`Could not find album with id ${id}`);
  }

  const { cover, name, songs, artists } = item;
  return {
    __typename: "Album",
    name,
    cover,
    id,
    artist: artists[0],
    songs: songs.map(id => song({}, { id }))
  };
};

export { album };
