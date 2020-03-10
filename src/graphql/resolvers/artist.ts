import albums from "../../data/albums.json";
import { default as data } from "../../data/artists.json";
import tracks from "../../data/tracks.json";
import { GQLQueryResolvers, GQLSong } from "../generated";
import { album as albumResolver } from "./album";

const album = albumResolver as Function;

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
    albums: albums
      .filter(item => item.artists.includes(id))
      .map(item =>
        album(
          {},
          {
            id: item.id
          }
        )
      ),
    popular: tracks
      .filter(item => popular.includes(item.id))
      .map(
        (track): GQLSong => {
          const item = tracks.find(({ id }) => id === track.id);
          if (!item) {
            throw new Error(`Could not find track with id ${track.id}`);
          }

          const { id, name } = item;
          const { id: albumID } = albums.find(({ id }) => id === item.album[0]);
          const artist = data.find(({ id }) => id === item.artist[0]);

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
            artist: artist.id,
            album: album(
              {},
              {
                id: albumID
              }
            )
          };
        }
      )
  };
};

export { artist };
