import { GQLQueryResolvers, GQLFeed, GQLSection } from "../generated";
import uuid from "uuid/v1";

interface Resolver extends Pick<GQLQueryResolvers, "feed"> {}

const data: Pick<GQLSection, "id" | "title">[] = [
  {
    id: uuid(),
    title: "Your heavy rotation"
  },
  {
    id: uuid(),
    title: "Recently Played"
  },
  {
    id: uuid(),
    title: "Your favorite albums and songs"
  },
  {
    id: uuid(),
    title: "Jump back in"
  },
  {
    id: uuid(),
    title: "Album picks"
  }
].sort(() => 0.5 - Math.random());

const resolver: Resolver = {
  feed: () => {
    return {
      __typename: "Feed",
      id: uuid(),
      sections: data.map(item => ({
        __typename: "Section",
        items: [],
        ...item
      }))
    };
  }
};

export { resolver };
