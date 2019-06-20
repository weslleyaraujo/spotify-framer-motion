import React, { HTMLProps } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { Button } from "../components/molecules/Button/Button";
import { SITEMAP } from "../site-map";
import { useBodyBackground } from "../hooks/useBodyBackground";
import { Section } from "../components/molecules/Section/Section";
import { Scrollable } from "../components/utilities/Scrollable/Scrollable";
import { Picture } from "../components/atoms/Picture/Picture";

interface Props {}

function Home(props: Props & RouteComponentProps) {
  useBodyBackground();
  return (
    <>
      <Section title="Recently played">
        <Button<HTMLProps<HTMLButtonElement>>
          rounded
          display="inline"
          label="Search"
          action={{
            as: "button",
            onClick: e => {
              e.preventDefault();
              navigate(SITEMAP.SEARCH);
            }
          }}
        />
      </Section>
      <Section
        title="Your heavy rotation"
        subtitle="The music you've had on repeat this month."
      >
        <Button<HTMLProps<HTMLButtonElement>>
          rounded
          display="inline"
          label="Search"
          action={{
            as: "button",
            onClick: e => {
              e.preventDefault();
              navigate(SITEMAP.SEARCH);
            }
          }}
        />
      </Section>
      <Section
        title="Your heavy rotation"
        subtitle="The music you've had on repeat this month."
      >
        <div>
          <Scrollable
            padding="small"
            horizontalPadding="medium"
            maxVisibleItems={2}
          >
            <Picture
              source="https://i.scdn.co/image/7f587bc2606cdd9907d7452e92a2158c63fa8a6e"
              alt="Release Radar"
              aspectRatio="square"
            />

            <Picture
              source="https://i.scdn.co/image/7f587bc2606cdd9907d7452e92a2158c63fa8a6e"
              alt="Release Radar"
              aspectRatio="square"
            />

            <Picture
              source="https://i.scdn.co/image/7f587bc2606cdd9907d7452e92a2158c63fa8a6e"
              alt="Release Radar"
              aspectRatio="square"
            />

            <Picture
              source="https://i.scdn.co/image/7f587bc2606cdd9907d7452e92a2158c63fa8a6e"
              alt="Release Radar"
              aspectRatio="square"
            />
          </Scrollable>
        </div>
      </Section>
    </>
  );
}

export { Home };
