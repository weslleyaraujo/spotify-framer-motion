import React, { HTMLProps } from "react";
import { TextLine } from "../components/atoms/TextLine/TextLine";
import { View } from "../components/atoms/View/View";
import { RouteComponentProps, navigate } from "@reach/router";
import { Button } from "../components/molecules/Button/Button";
import { SITEMAP } from "../site-map";
import { useBodyBackground } from "../hooks/useBodyBackground";
import { useTheme } from "../foundations/useTheme";

interface Props {}

function Home(props: Props & RouteComponentProps) {
  useBodyBackground();
  const theme = useTheme();
  return (
    <>
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
      <Button rounded type="primary" label="Shuffle play" />
      <Button rounded display="inline" type="secondary" label="Secondary" />
      {Object.keys(theme.colors).map(key => (
        <View
          key={key}
          padding="largest"
          style={{
            backgroundColor: theme.colors[key as keyof typeof theme.colors]
          }}
        >
          <TextLine text={key} />
        </View>
      ))}
    </>
  );
}

export { Home };
