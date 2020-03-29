import data from "../../data/genres.json";

import { GQLQueryResolvers, GQLGenre } from "../generated";
import { song as songResolver } from "./song";

const song = songResolver as Function;
const genres: GQLQueryResolvers["genres"] = (parent, args, context) => {
  return data.map(
    (item): GQLGenre => ({
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
    })
  );
};

export { genres };
