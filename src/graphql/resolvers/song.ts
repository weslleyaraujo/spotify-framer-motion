import albums from "../../data/albums.json";
import { default as data } from "../../data/tracks.json";
import { GQLQueryResolvers, GQLAlbum } from "../generated";
import { album as albumResolver } from "./album";
const album = albumResolver as Function;

const song: GQLQueryResolvers["song"] = (parent, { id }, context) => {
  const item = data.find(item => item.id === id);
  if (!item) {
    throw new Error(`Could not find song with id ${id}`);
  }
  return {
    __typename: "Song",
    id: item.id,
    name: item.name,
    album: (albums
      .filter(item => item.artists.includes(id))
      .map(item =>
        album(
          {},
          {
            id: item.id
          }
        )
      ) as unknown) as GQLAlbum
  };
};

export { song };
