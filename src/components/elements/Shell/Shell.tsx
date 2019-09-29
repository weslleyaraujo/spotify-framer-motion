import { Link, LinkProps, useRouteMatch } from "react-router-dom";

import { ForegroundColors } from "../../atoms/TextLine/TextLine";
import { Icons } from "../../../foundations/icons";
import { Layers } from "../../../foundations/Layers";
import { Navigation } from "../../molecules/Navigation/Navigation";
import React from "react";
import { SITEMAP } from "../../../site-map";
import { View } from "../../atoms/View/View";

function Shell({ children }: { children: React.ReactNode }) {
  const root = useRouteMatch(SITEMAP.ROOT);
  const search = useRouteMatch(SITEMAP.SEARCH);
  const library = useRouteMatch(SITEMAP.LIBRARY);
  const active = {
    [SITEMAP.ROOT]: Boolean(root && root.isExact),
    [SITEMAP.SEARCH]: Boolean(search && search.isExact),
    [SITEMAP.LIBRARY]: Boolean(library && library.isExact)
  };
  return (
    <View
      justify="space-between"
      direction="column"
      style={{
        height: "100vh"
      }}
    >
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: Layers.Stacks
        }}
      >
        <Navigation<LinkProps<{}>>
          items={[
            {
              action: { as: Link, to: SITEMAP.ROOT },
              active: active[SITEMAP.ROOT],
              color: active[SITEMAP.ROOT]
                ? "foregroundPrimary"
                : ("foregroundSecondary" as ForegroundColors),
              icon: (active[SITEMAP.ROOT]
                ? "homeFill"
                : "homeOutline") as Icons,
              text: "Home"
            },
            {
              action: { as: Link, to: SITEMAP.SEARCH },
              active: active[SITEMAP.SEARCH],
              color: active[SITEMAP.SEARCH]
                ? "foregroundPrimary"
                : ("foregroundSecondary" as ForegroundColors),
              icon: (search
                ? "magnifyingGlassFill"
                : "magnifyingGlassOutline") as Icons,
              text: "Search"
            },
            {
              action: { as: Link, to: SITEMAP.LIBRARY },
              active: active[SITEMAP.LIBRARY],
              color: active[SITEMAP.LIBRARY]
                ? "foregroundPrimary"
                : ("foregroundSecondary" as ForegroundColors),
              icon: (search ? "libraryFill" : "libraryOutline") as Icons,
              text: "Your Library"
            }
          ]}
        />
      </div>
    </View>
  );
}

export { Shell };
