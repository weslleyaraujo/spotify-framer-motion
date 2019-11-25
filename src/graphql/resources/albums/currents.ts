import url from "../../../assets/images/tame-impala-currents.jpg";
import { GQLAlbum } from "../../generated";
import { artist } from "../artists/tame-impala";
import uuid from "uuid";

const id = uuid();
const album: GQLAlbum = {
  __typename: "Album",
  id,
  artist: artist.id,
  name: "Currents",
  cover: {
    __typename: "Image",
    url
  },
  songs: [
    "Let It Happen",
    "Nangs",
    "The Moment",
    "Yes I'm Changing",
    "Eventually",
    "Gossip",
    "The Less I Know the Better",
    "Past Life",
    "Disciples",
    "'Cause I'm a Man",
    "Reality in Motion",
    "Love/Paranoia",
    "New Person, Same Old Mistakes"
  ].map(name => ({
    __typename: "Song",
    album_id: id,
    artist_id: artist.id,
    id: uuid(),
    name
  }))
};

export { album };
