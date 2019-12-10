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
import shuffle from "lodash.shuffle";

const resources: {
  [key in GQLSectionType]: { id: string; cover: string; name: string }[];
} = {
  [GQLSectionType.Album]: albums,
  [GQLSectionType.Artist]: artists,
  [GQLSectionType.Playlist]: playlists
};

function parseJSON({
  type,
  items
}: {
  items?: string[];
  type: GQLSectionType;
}) {
  const data = resources[type];
  return [...(items ? items : [])]
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
    items: shuffle([
      ...parseJSON({
        items: item.albums,
        type: GQLSectionType.Album
      }),
      ...parseJSON({
        items: item.artists,
        type: GQLSectionType.Artist
      }),
      ...parseJSON({
        items: item.playlists,
        type: GQLSectionType.Playlist
      })
    ])
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
