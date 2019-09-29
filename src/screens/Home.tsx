import { Link, LinkProps } from "react-router-dom";

import { CardCover } from "../components/elements/CardCover/CardCover";
import { Icon } from "../components/atoms/Icon/Icon";
import { Icons } from "../foundations/icons";
import { Picture } from "../components/atoms/Picture/Picture";
import React from "react";
import { SITEMAP } from "../site-map";
import { Scrollable } from "../components/utilities/Scrollable/Scrollable";
import { Section } from "../components/molecules/Section/Section";
import { View } from "../components/atoms/View/View";
import { useBodyBackground } from "../hooks/useBodyBackground";

interface Props {}

function Home(props: Props) {
  useBodyBackground({
    color: "yellow",
    gradientStyle: "topLeft"
  });

  return (
    <>
      <View justify="flex-end" padding="medium">
        <Link to={SITEMAP.SETTINGS}>
          <Icon<Icons> type="settings" color="absoluteLight" size="small" />
        </Link>
      </View>
      {[...new Array(12)].map((item, index) => (
        <Section
          key={`home-section-${index}`}
          title="Your heavy rotation"
          subtitle="The music you've had on repeat this month."
          padding={["medium", "none", "large", "none"]}
        >
          <Scrollable
            padding="small"
            horizontalPadding="medium"
            maxVisibleItems={2}
          >
            <Picture
              source="https://i.scdn.co/image/7f587bc2606cdd9907d7452e92a2158c63fa8a6e?a"
              alt="Release Radar"
              aspectRatio="square"
            />

            <Picture
              source="https://i.scdn.co/image/7f587bc2606cdd9907d7452e92a2158c63fa8a6e?b"
              alt="Release Radar"
              aspectRatio="square"
            />

            <Picture
              source="https://i.scdn.co/image/7f587bc2606cdd9907d7452e92a2158c63fa8a6e?c"
              alt="Release Radar"
              aspectRatio="square"
            />

            <Picture
              source="https://i.scdn.co/image/7f587bc2606cdd9907d7452e92a2158c63fa8a6e?d"
              alt="Release Radar"
              aspectRatio="square"
            />

            <Picture
              source="https://i.scdn.co/image/7f587bc2606cdd9907d7452e92a2158c63fa8a6e?e"
              alt="Release Radar"
              aspectRatio="square"
            />

            <Picture
              source="https://i.scdn.co/image/7f587bc2606cdd9907d7452e92a2158c63fa8a6e?f"
              alt="Release Radar"
              aspectRatio="square"
            />

            <Picture
              source="https://replacecover.com/images/objects/thenight.png"
              alt="Release Radar"
              aspectRatio="square"
            />
          </Scrollable>
        </Section>
      ))}

      <Section
        title="Your CardCover rotation"
        subtitle="The music you've had on repeat this month."
        padding={["medium", "none", "large", "none"]}
      >
        <Scrollable
          padding="small"
          horizontalPadding="medium"
          maxVisibleItems={2}
        >
          <CardCover<LinkProps>
            title="Release Radar"
            interactions={{
              primary: {
                icon: "homeFill",
                iconColor: "absoluteDark",
                label: "Release Radar",
                action: {
                  as: Link,
                  to: SITEMAP.SEARCH
                }
              }
            }}
            media={{
              type: "image",
              credits: "Hello World",
              source: "https://replacecover.com/images/objects/thenight.png"
            }}
          />
        </Scrollable>
      </Section>
    </>
  );
}

export { Home };
