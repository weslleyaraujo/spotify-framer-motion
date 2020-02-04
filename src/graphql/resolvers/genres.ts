import data from "../../data/genres.json";

import { GQLQueryResolvers, GQLGenre } from "../generated";

const genres: GQLQueryResolvers["genres"] = (parent, args, context) => {
  return data.map(
    (item): GQLGenre => ({
      __typename: "Genre",
      id: item.id,
      name: item.name,
      cover: item.cover,
      color: {
        __typename: "GradientColor",
        end: item.colorend,
        start: item.colorstart
      }
    })
  );
};

export { genres };
