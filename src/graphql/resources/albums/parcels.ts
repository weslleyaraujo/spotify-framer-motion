import url from "../../../assets/images/parcels-parcels.jpg";
import { GQLAlbum } from "../../generated";
import { artist } from "../artists/parcels";
import uuid from "uuid";

const id = uuid();
const album: GQLAlbum = {
  id,
  artist: artist.id,
  name: "Parcels",
  cover: {
    __typename: "Image",
    url
  },
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
    album_id: id,
    artist_id: artist.id,
    id: uuid(),
    name
  }))
};

export { album };
