import data from "../../data/artists.json";
import tracks from "../../data/tracks.json";
import albums from "../../data/albums.json";
import artists from "../../data/artists.json";

import { GQLQueryResolvers, GQLSong } from "../generated";

const artist: GQLQueryResolvers["artist"] = (parent, { id }, context) => {
  const item = data.find(item => item.id === id);
  if (!item) {
    throw new Error(`Could not find artist with id ${id}`);
  }

  const { cover, name, popular, listeners } = item;
  return {
    __typename: "Artist",
    name,
    cover,
    id,
    listeners,
    popular: tracks
      .filter(item => popular.includes(item.id))
      .map(
        (track): GQLSong => {
          const item = tracks.find(({ id }) => id === track.id);
          if (!item) {
            throw new Error(`Could not find track with id ${track.id}`);
          }

          const { id, name } = item;
          const album = albums.find(({ id }) => id === item.album[0]);
          const artist = artists.find(({ id }) => id === item.artist[0]);

          if (!album) {
            throw new Error(`Could not find album with id ${item.album[0]}`);
          }

          if (!artist) {
            throw new Error(`Could not find album with id ${item.artist[0]}`);
          }

          return {
            __typename: "Song",
            name,
            id,
            album: album.id,
            artist: artist.id
          };
        }
      )
  };
};

export { artist };