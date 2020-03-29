import data from "../../data/genres.json";
import { GQLQueryResolvers } from "../generated";
import { song as songResolver } from "./song";

const song = songResolver as Function;
const genre: GQLQueryResolvers["genre"] = (parent, { id }, context) => {
  const item = data.find(item => item.id === id);
  if (!item) {
    throw new Error(`Could not find genre with id ${id}`);
  }

  return {
    __typename: "Genre",
    id: item.id,
    name: item.name,
    cover: item.cover,
    songs: item["track-genres"]?.map(id => song({}, { id })),
    color: {
      __typename: "GradientColor",
      end: item.colorend,
      start: item.colorstart
    }
  };
};

export { genre };
