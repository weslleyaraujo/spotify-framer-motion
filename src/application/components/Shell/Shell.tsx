import { AnimatePresence } from "framer-motion";
import React, { useMemo } from "react";
import { Link, LinkProps, useRouteMatch } from "react-router-dom";
import { ForegroundColors } from "../../../components/atoms/TextLine/TextLine";
import { View } from "../../../components/atoms/View/View";
import { Navigation } from "../../../components/molecules/Navigation/Navigation";
import { Icons } from "../../../foundations/icons";
import { Layers } from "../../../foundations/Layers";
import { PickEnum } from "../../../utils/pick-enum";
import { SITEMAP } from "../../site-map";
import { MiniPlayer } from "../MiniPlayer/MiniPlayer";

const ICON_MAP: {
  [key: string]: {
    default: Icons;
    active: Icons;
  };
} = {
  [SITEMAP.HOME]: {
    default: "homeOutline",
    active: "homeFill"
  },
  [SITEMAP.LIBRARY]: {
    default: "libraryOutline",
    active: "libraryFill"
  },
  [SITEMAP.SEARCH]: {
    default: "magnifyingGlassOutline",
    active: "magnifyingGlassFill"
  }
};

const TEXT_MAP: {
  [key: string]: string;
} = {
  [SITEMAP.HOME]: "Home",
  [SITEMAP.SEARCH]: "Search",
  [SITEMAP.LIBRARY]: "Library"
};

const COLOR_MAP: {
  default: ForegroundColors;
  active: ForegroundColors;
} = {
  default: "foregroundPrimary",
  active: "absoluteLight"
};

type ActionProps = LinkProps<{}>;

function Shell({ children }: { children: React.ReactNode }) {
  const root = useRouteMatch(SITEMAP.ROOT);
  const search = useRouteMatch(SITEMAP.SEARCH);
  const library = useRouteMatch(SITEMAP.LIBRARY);
  const ACTIVE_MAP: {
    [key: string]: boolean;
  } = {
    [SITEMAP.ROOT]: Boolean(root && root.isExact),
    [SITEMAP.SEARCH]: Boolean(search && search.isExact),
    [SITEMAP.LIBRARY]: Boolean(library && library.isExact)
  };

  const items = useMemo(() => {
    const keys = (Object.keys as unknown) as (o: {}) => PickEnum<
      keyof typeof SITEMAP,
      "HOME" | "SEARCH" | "LIBRARY"
    >[];

    return keys(ACTIVE_MAP).map(key => {
      const active = ACTIVE_MAP[key];
      return {
        active: ACTIVE_MAP[key],
        action: { as: Link, to: key },
        color: COLOR_MAP[active ? "active" : "default"],
        text: TEXT_MAP[key],
        icon: ICON_MAP[key][active ? "active" : "default"]
      };
    });
  }, [ACTIVE_MAP]);

  const key = useMemo(() => {
    const active = items.find(item => item.active);
    if (active) {
      return active.text;
    }

    return "not-found";
  }, [items]);

  return (
    <View
      justify="space-between"
      direction="column"
      style={{
        height: "100vh"
      }}
    >
      <AnimatePresence key={key}>{children}</AnimatePresence>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: Layers.Stacks
        }}
      >
        <MiniPlayer />
        <Navigation<ActionProps> items={items} />
      </div>
    </View>
  );
}

export { Shell };
