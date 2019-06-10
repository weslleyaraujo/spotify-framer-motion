import React, { HTMLProps } from "react";
import { TextLine } from "../components/atoms/TextLine/TextLine";
import { View } from "../components/atoms/View/View";
import { RouteComponentProps, navigate } from "@reach/router";
import { Button } from "../components/molecules/Button/Button";
import { SITEMAP } from "../site-map";
import { useBodyBackground } from "../hooks/useBodyBackground";

interface Props {}

function Home(props: Props & RouteComponentProps) {
  useBodyBackground();
  return (
    <>
      <View padding="large">
        <TextLine type="display" text="Home" color="white" />
      </View>
      <Button<HTMLProps<HTMLButtonElement>>
        rounded
        display="inline"
        label="Normal button"
        action={{
          as: "button",
          onClick: e => {
            e.preventDefault();
            navigate(SITEMAP.SEARCH);
          }
        }}
      />
    </>
  );
}

export { Home };
