import React, { HTMLProps } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { Button } from "../components/molecules/Button/Button";
import { SITEMAP } from "../site-map";
import { useBodyBackground } from "../hooks/useBodyBackground";
import { Section } from "../components/molecules/Section/Section";
import { Scrollable } from "../components/utilities/Scrollable/Scrollable";
import { TextLine } from "../components/atoms/TextLine/TextLine";
import { View } from "../components/atoms/View/View";

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
      <Section title="Example">
        <View
          style={{ backgroundColor: "white", width: "100%" }}
          radius="medium"
          padding="large"
        >
          <TextLine color="primary" text="Hello" type="display" />
        </View>
      </Section>

      <Scrollable
        padding="small"
        horizontalPadding="medium"
        maxVisibleItems={2}
      >
        <View
          style={{ backgroundColor: "orange" }}
          radius="medium"
          padding="large"
        >
          <TextLine text="Hello" type="display" />
        </View>
        <View
          style={{ backgroundColor: "magenta" }}
          radius="medium"
          padding="large"
        >
          <TextLine color="white" text="World" type="display" />
        </View>
        <View
          style={{ backgroundColor: "papayawhip" }}
          radius="medium"
          padding="large"
        >
          <TextLine color="primary" text="Hello" type="display" />
        </View>
        <View
          style={{ backgroundColor: "green" }}
          radius="medium"
          padding="large"
        >
          <TextLine color="primary" text="World" type="display" />
        </View>
      </Scrollable>
    </>
  );
}

export { Home };
