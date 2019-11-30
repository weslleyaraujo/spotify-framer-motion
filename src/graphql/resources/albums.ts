import { GQLAlbum } from "../generated";
import { artists } from "./artists";
import uuid from "uuid";

import parcelsCover from "../../assets/images/parcels-parcels.jpeg";
import twoHandsCover from "../../assets/images/big-thief-two-hands.jpeg";
import currentsCover from "../../assets/images/tame-impala-currents.jpeg";

const currentsId = uuid();
const currents: GQLAlbum = {
  id: currentsId,
  artist: artists.tameImpala.id,
  name: "Currents",
  cover: currentsCover,
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
    albumId: currentsId,
    artistId: artists.tameImpala.id,
    id: uuid(),
    name
  }))
};

const parcelsId = uuid();
const parcels: GQLAlbum = {
  id: parcelsId,
  artist: artists.parcels.id,
  name: "Parcels",
  cover: parcelsCover,
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
    albumId: parcelsId,
    artistId: artists.parcels.id,
    id: uuid(),
    name
  }))
};

const twoHandsId = uuid();
const twoHands: GQLAlbum = {
  id: parcelsId,
  artist: artists.bigThief.id,
  name: "Two Hands",
  cover: twoHandsCover,
  songs: [
    "Rock and Sing",
    "Forgotten Eyes",
    "The Toy",
    "Two Hands",
    "Those Girls",
    "Shoulders",
    "Not",
    "Wolf",
    "Replaced",
    "Cut My Hair"
  ].map(name => ({
    __typename: "Song",
    albumId: twoHandsId,
    artistId: artists.bigThief.id,
    id: uuid(),
    name
  }))
};

const albums = {
  currents,
  parcels,
  twoHands
};

export { albums };
