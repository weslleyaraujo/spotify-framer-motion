import uuid from "uuid/v1";
import { GQLQueryResolvers, GQLSection, GQLSectionType } from "../generated";
import { albums } from "../resources/albums";

function shuffle<T>(items: T[]) {
  return items.sort(() => (0.5 <= Math.random() ? 1 : -1));
}

const data: GQLSection[] = [
  {
    __typename: "Section",
    id: uuid(),
    title: "Your Heavy Rotation",
    items: shuffle([
      {
        __typename: "SectionItem",
        cover: albums.currents.cover,
        id: uuid(),
        type: GQLSectionType.Album,
        name: albums.currents.name,
        contentId: albums.currents.id
      },
      {
        __typename: "SectionItem",
        cover: albums.parcels.cover,
        id: uuid(),
        type: GQLSectionType.Album,
        name: albums.parcels.name,
        contentId: albums.parcels.id
      },
      {
        __typename: "SectionItem",
        cover: albums.twoHands.cover,
        id: uuid(),
        type: GQLSectionType.Album,
        name: albums.parcels.name,
        contentId: albums.twoHands.id
      }
    ])
  },
  {
    __typename: "Section",
    id: uuid(),
    title: "Recently Played",
    items: [
      {
        __typename: "SectionItem",
        cover: albums.parcels.cover,
        id: uuid(),
        type: GQLSectionType.Album,
        name: albums.parcels.name,
        contentId: albums.parcels.id
      }
    ]
  }
  // {
  //   __typename: "Section",
  //   id: uuid(),
  //   title: "Your favorite albums and songs",
  //   items: [
  //     // {
  //     //   id: uuid()
  //     // }
  //   ]
  // },
  // {
  //   __typename: "Section",
  //   id: uuid(),
  //   title: "Jump back in",
  //   items: [
  //     // {
  //     //   id: uuid()
  //     // }
  //   ]
  // }
];

const feed: GQLQueryResolvers["feed"] = () => {
  return {
    __typename: "Feed",
    id: uuid(),
    sections: data
  };
};

export { feed };
