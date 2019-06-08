import React, { HTMLProps } from "react";
import { TextLine } from "../components/atoms/TextLine/TextLine";
import { RouteComponentProps, navigate } from "@reach/router";
import { Button } from "../components/molecules/Button/Button";
import { SITEMAP } from "../site-map";

interface Props {}

function Home(props: Props & RouteComponentProps) {
  return (
    <>
      <TextLine text="Home" type="display" />
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
      <Button rounded display="inline" type="secondary" label="More Actions" />
    </>
  );
}

export { Home };
