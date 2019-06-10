import React, { HTMLProps } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { Button } from "../components/molecules/Button/Button";
import { SITEMAP } from "../site-map";
import { useBodyBackground } from "../hooks/useBodyBackground";
import { Section } from "../components/molecules/Section/Section";

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
    </>
  );
}

export { Home };
