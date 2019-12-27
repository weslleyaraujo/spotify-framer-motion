import artists from "../../data/artists.json";
import tracks from "../../data/tracks.json";
import albums from "../../data/albums.json";

import { GQLQueryResolvers, GQLSearchResultType } from "../generated";

// LOL
const data = [
  ...artists.map(item => ({
    id: item.id,
    name: item.name,
    type: GQLSearchResultType.Artist,
    cover: item.cover
  })),
  ...tracks.map(item => ({
    id: item.id,
    name: item.name,
    type: GQLSearchResultType.Track,
    cover: "" // TODO: find cover for the track
  })),
  ...albums.map(item => ({
    id: item.id,
    name: item.name,
    type: GQLSearchResultType.Album,
    cover: item.cover
  }))
];

const search: GQLQueryResolvers["search"] = (parent, { term }, context) => {
  const match = new RegExp(term.toLocaleLowerCase().trim());
  return data
    .filter(item => match.test(item.name.toLocaleLowerCase().trim()))
    .map(item => ({
      __typename: "SearchResult",
      ...item
    }));
};

export { search };
