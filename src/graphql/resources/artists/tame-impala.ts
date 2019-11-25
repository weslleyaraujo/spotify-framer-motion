import uuid from "uuid";
import url from "../../../assets/images/tame-impala.jpg";
import { GQLArtist } from "../../generated";

const artist: GQLArtist = {
  __typename: "Artist",
  id: uuid(),
  monthly_listeners: 93827,
  name: "Tame Impala",
  cover: {
    __typename: "Image",
    url
  }
};

export { artist };
