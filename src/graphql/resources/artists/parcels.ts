import { Album, Artist } from "../../generated";

import url from "../../../assets/images/parcels.jpg";
import parcels from "../../../assets/images/parcels-parcels.jpg";

const artist: Artist = {
  __typename: "Artist",
  id: "parcels-id",
  monthly_listeners: 93827,
  name: "Parcels",
  cover: {
    __typename: "Image",
    url
  }
};

const albums: Album[] = [
  {
    __typename: "Album",
    artist,
    id: "parcels-album-id",
    name: "Parcels",
    songs: [
      "Comedown",
      "Lightenup",
      "Tape",
      "Everyroad",
      "Yourfault",
      "Closetowhy",
      "IknowhowIfeel",
      "Exotica",
      "Tieduprightnow",
      "Bemyself",
      "Credit (feat. Dean Dawson)"
    ].map(name => ({
      __typename: "Song",
      album_id: "parcels-album-id",
      artist_id: "parcels-id",
      id: `parcels-album-id-${name.toLocaleLowerCase()}`,
      name
    })),
    cover: {
      __typename: "Image",
      url: parcels
    }
  }
];

export { artist, albums };
