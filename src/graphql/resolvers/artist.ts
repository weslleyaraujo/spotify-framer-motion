import data from "../../data/artists.json";
import { GQLQueryResolvers } from "../generated";

const artist: GQLQueryResolvers['artist'] = (parent, { id }, context) => {
  const item = data.find(item => item.id === id);
  if (!item) {
    throw new Error(`Could not find artist with id ${id}`)
  }

  const { cover, name } = item;
  return {
    __typename: "Artist",
    name,
    cover,
    id,
    listeners: 100 // TODO: add to airtable
  }

}

export { artist };

