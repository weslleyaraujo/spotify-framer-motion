import { GQLQueryResolvers } from "../generated";
import uuid from "uuid/v1";

interface Resolver extends Pick<GQLQueryResolvers, "feed"> {}

const resolver: Resolver = {
  feed: () => {
    return {
      __typename: "Feed",
      id: uuid(),
      sections: [
        {
          __typename: "Section",
          id: uuid(),
          title: "Example",
          subtitle: "Example bar",
          items: [
            {
              id: uuid()
            }
          ]
        }
      ]
    };
  }
};

export { resolver };
