import uuid from "uuid";
import coverParcels from "../../assets/images/parcels.jpeg";
import coverTameImpala from "../../assets/images/tame-impala.jpeg";
import coverBigThief from "../../assets/images/big-thief.jpeg";

import { GQLArtist } from "../generated";

const bigThief: GQLArtist = {
  id: uuid(),
  monthlyListeners: 2988,
  name: "Big Thief",
  cover: coverBigThief
};

const parcels: GQLArtist = {
  id: uuid(),
  monthlyListeners: 93827,
  name: "Parcels",
  cover: coverParcels
};

const tameImpala: GQLArtist = {
  id: uuid(),
  monthlyListeners: 93827,
  name: "Tame Impala",
  cover: coverTameImpala
};

const artists = {
  tameImpala,
  parcels,
  bigThief
};

export { artists };
