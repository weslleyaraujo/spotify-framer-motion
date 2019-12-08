import { ValuesType } from "utility-types";
import uuid from "uuid/v1";
import albums from "../../data/albums.json";
import artists from "../../data/artists.json";
import playlists from "../../data/playlists.json";
import data from "../../data/feed.json";
import {
  GQLQueryResolvers,
  GQLSection,
  GQLSectionItem,
  GQLSectionType
} from "../generated";

function parseJSON<T extends { id: string; cover: string; name: string }>({
  data,
  type,
  items
}: {
  items: string[];
  data: T[];
  type: GQLSectionType;
}) {
  return items
    .map((id): GQLSectionItem | undefined => {
      const item: ValuesType<typeof data> | undefined = data.find(
        i => i.id === id
      );

      if (item) {
        return {
          __typename: "SectionItem",
          contentId: item.id,
          cover: item.cover,
          id: uuid(),
          name: item.name,
          type
        };
      }

      return undefined;
    })
    .filter(Boolean) as GQLSectionItem[];
}

const sections = data.map(
  (item): GQLSection => ({
    __typename: "Section",
    id: item.id,
    title: item.name,
    items: [
      ...parseJSON({
        items: item.albums,
        data: albums,
        type: GQLSectionType.Album
      }),
      ...parseJSON({
        items: item.artists,
        data: artists,
        type: GQLSectionType.Artist
      }),
      ...parseJSON({
        items: item.playlists,
        data: playlists,
        type: GQLSectionType.Playlist
      })
    ]
  })
);

const feed: GQLQueryResolvers["feed"] = () => {
  return {
    __typename: "Feed",
    id: uuid(),
    sections
  };
};

export { feed };
