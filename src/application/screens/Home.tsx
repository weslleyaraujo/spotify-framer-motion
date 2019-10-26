import { Link, LinkProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { CardCover } from "../../components/elements/CardCover/CardCover";
import { Icon } from "../../components/atoms/Icon/Icon";
import { Icons } from "../../foundations/icons";
import { Picture } from "../../components/atoms/Picture/Picture";
import React from "react";
import { SITEMAP } from "../site-map";
import { Scrollable } from "../../components/utilities/Scrollable/Scrollable";
import { Section } from "../../components/molecules/Section/Section";
import { View } from "../../components/atoms/View/View";
import { useBodyBackground } from "../../hooks/use-body-background";
import { motion } from "framer-motion";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";

interface Props {}

function Home(props: Props) {
  useBodyBackground({
    color: "yellow",
    gradientStyle: "topLeft"
  });

  return (
    <FadePresence>
      <View justify="flex-end" padding="medium">
        <Link to={SITEMAP.SETTINGS}>
          <Icon<Icons> type="settings" color="absoluteLight" size="small" />
        </Link>
      </View>
      {[...new Array(10)].map((item, index) => (
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
            {[...new Array(5)].map((item, index) => (
              <Picture
                key={`home-section-picture-${index}`}
                source="https://i.scdn.co/image/7f587bc2606cdd9907d7452e92a2158c63fa8a6e?a"
                alt="Release Radar"
                aspectRatio="square"
              />
            ))}
          </Scrollable>
        </Section>
      ))}
    </FadePresence>
  );
}

export { Home };
