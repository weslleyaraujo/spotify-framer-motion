import React, { HTMLProps } from "react";
import { Text } from "../components/atoms/Text/Text";
import { RouteComponentProps, navigate } from "@reach/router";
import { Button } from "../components/molecules/Button/Button";
import { SITEMAP } from "../site-map";

interface Props {}

function Home(props: Props & RouteComponentProps) {
  return (
    <>
      <Text text="Home" type="display" />
      <Button<HTMLProps<HTMLButtonElement>>
        rounded
        display="inline"
        label="Go to Search"
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
