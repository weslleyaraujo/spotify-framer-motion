import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useBodyBackground } from "../hooks/useBodyBackground";
import { Section } from "../components/molecules/Section/Section";
import { Scrollable } from "../components/utilities/Scrollable/Scrollable";
import { Picture } from "../components/atoms/Picture/Picture";
import { View } from "../components/atoms/View/View";
import { Icon } from "../components/atoms/Icon/Icon";
import { IconTypes } from "../foundations/icons";

interface Props {}

function Home(props: Props & RouteComponentProps) {
  useBodyBackground({
    color: "yellow",
    gradientStyle: "topLeft"
  });
  return (
    <>
      <View justify="flex-end" padding="medium">
        <Icon<IconTypes> type="settings" color="white" size="smaller" />
      </View>
      <Section
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
      <Section
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
    </>
  );
}

export { Home };
