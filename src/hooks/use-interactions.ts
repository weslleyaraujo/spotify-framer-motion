import { Link, LinkProps } from "react-router-dom";
import { SITEMAP } from "../application/site-map";
import { Interaction } from "../interfaces/Card";
import { createUrl } from "../utils/create-url";

interface Identifier {
  id: string;
}

export enum INTERACTIONS {
  NAVIGATE_ARTIST,
  NAVIGATE_ALBUM,
  NAVIGATE_PLAYLIST
}

interface Payload {
  [INTERACTIONS.NAVIGATE_ARTIST]: Identifier;
  [INTERACTIONS.NAVIGATE_ALBUM]: Identifier;
  [INTERACTIONS.NAVIGATE_PLAYLIST]: Identifier;
}

function useInteractions<T extends INTERACTIONS>(
  type: T,
  payload: Payload[T] & Pick<Interaction<{}>, "icon" | "iconColor" | "label">
) {
  const { icon, iconColor, label, ...data } = payload;
  switch (type) {
    case INTERACTIONS.NAVIGATE_PLAYLIST:
    case INTERACTIONS.NAVIGATE_ALBUM:
    case INTERACTIONS.NAVIGATE_ARTIST: {
      const paths = {
        [INTERACTIONS.NAVIGATE_ARTIST]: SITEMAP.ARTIST,
        [INTERACTIONS.NAVIGATE_ALBUM]: SITEMAP.ALBUM,
        [INTERACTIONS.NAVIGATE_PLAYLIST]: SITEMAP.PLAYLIST
      };
      const { id } = data;
      const interaction: Interaction<LinkProps> = {
        action: {
          as: Link,
          style: {
            minWidth: 0
          },
          to: createUrl<Payload[typeof type]>(paths[type], {
            interpolate: {
              id
            }
          })
        },
        label,
        icon,
        iconColor
      };

      return interaction;
    }

    default: {
      throw new Error(`Could not find interaction handler for ${type}`);
    }
  }
}

function useLazyInteractions() {
  return (...args: Parameters<typeof useInteractions>) =>
    useInteractions.apply(null, args);
}

export { useInteractions, useLazyInteractions };
