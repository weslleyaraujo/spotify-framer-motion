import { Album, Artist } from "../../generated";

import url from "../../../assets/images/big-thief.jpg";

const artist: Artist = {
  __typename: "Artist",
  id: "big-thief-id",
  monthly_listeners: 2988,
  name: "Big Thief",
  cover: {
    __typename: "Image",
    url
  }
};

const albums: Album[] = [];

export { artist, albums };
