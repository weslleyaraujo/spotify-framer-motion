import uuid from "uuid";
import url from "../../../assets/images/parcels.jpg";
import { GQLArtist } from "../../generated";

const artist: GQLArtist = {
  __typename: "Artist",
  id: uuid(),
  monthly_listeners: 93827,
  name: "Parcels",
  cover: {
    __typename: "Image",
    url
  }
};

export { artist };
