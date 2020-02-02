import artists from "../../data/artists.json";
import tracks from "../../data/tracks.json";
import albums from "../../data/albums.json";
import Fuse from "fuse.js";
import flatten from "lodash.flatten";

import { GQLQueryResolvers, GQLSearchResultType } from "../generated";

/**  Here's a super LOL search. Love it */
const data = [
  ...artists.map(item => ({
    id: item.id,
    name: item.name,
    body: "Artist",
    type: GQLSearchResultType.Artist,
    terms: flatten([
      item.name,
      tracks
        .filter(track => track.artist.includes(item.id))
        .map(track => track.name)
    ]),
    cover: item.cover
  })),
  ...tracks.map(item => ({
    id: item.id,
    name: item.name,
    body: `Song · ${
      artists.find(artist => item.artist.includes(artist.id))?.name
    }`,
    type: GQLSearchResultType.Track,
    terms: flatten([
      item.name,
      item.artist
        .map(id => artists.find(i => i.id === id))
        .filter(Boolean)
        .map(item => item.name)
    ]),
    cover: albums.find(album => item.album.includes(album.id))?.cover || ""
  })),
  ...albums.map(item => ({
    id: item.id,
    name: item.name,
    body: `Album · ${
      artists.find(artist => item.artists.includes(artist.id))?.name
    }`,
    type: GQLSearchResultType.Album,
    cover: item.cover,
    terms: flatten([
      item.name,
      tracks
        .filter(track => track.album.includes(item.id))
        .map(track => track.name)
    ])
  }))
];

const fuzzy = new Fuse(data, {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["terms"]
});

const search: GQLQueryResolvers["search"] = (parent, { term }, context) => {
  return fuzzy.search(term.toLocaleLowerCase().trim()).map(item => ({
    __typename: "SearchResult",
    ...item
  }));
};

export { search };
