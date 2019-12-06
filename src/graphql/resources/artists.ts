import uuid from "uuid";
import coverParcels from "../../assets/images/parcels.jpeg";
import coverTameImpala from "../../assets/images/tame-impala.jpeg";
import coverBigThief from "../../assets/images/big-thief.jpeg";
import coverFKJ from "../../assets/images/fkj.jpeg";
import coverRhye from "../../assets/images/rhye.jpeg";
import coverUMO from "../../assets/images/unknown-mortal-orchestra.jpeg";

import { GQLArtist } from "../generated";

const random = (max: number = 4000) =>
  Math.floor(Math.random() * Math.floor(max));

const bigThief: GQLArtist = {
  id: uuid(),
  monthlyListeners: random(),
  name: "Big Thief",
  cover: coverBigThief
};

const parcels: GQLArtist = {
  id: uuid(),
  monthlyListeners: random(),
  name: "Parcels",
  cover: coverParcels
};

const tameImpala: GQLArtist = {
  id: uuid(),
  monthlyListeners: random(),
  name: "Tame Impala",
  cover: coverTameImpala
};

const fkj: GQLArtist = {
  id: uuid(),
  monthlyListeners: random(),
  name: "FKJ",
  cover: coverFKJ
};

const rhye: GQLArtist = {
  id: uuid(),
  monthlyListeners: random(),
  name: "Rhye",
  cover: coverRhye
};

const unknownMortalOrchestra: GQLArtist = {
  id: uuid(),
  monthlyListeners: random(),
  name: "Unknown Mortal Orchestra",
  cover: coverUMO
};

const macDemarco: GQLArtist = {
  id: uuid(),
  monthlyListeners: random(),
  name: "Mac Demarco",
  cover: coverUMO
};

const artists = {
  tameImpala,
  parcels,
  bigThief,
  fkj,
  rhye,
  unknownMortalOrchestra
};

export { artists };
