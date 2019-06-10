import React from "react";
import { TextLine } from "../components/atoms/TextLine/TextLine";
import { View } from "../components/atoms/View/View";
import { RouteComponentProps } from "@reach/router";
import { Button } from "../components/molecules/Button/Button";
import { useBodyBackground } from "../hooks/useBodyBackground";
import { useTheme } from "../foundations/useTheme";

interface Props {}

function ThemeExplorer(props: Props & RouteComponentProps) {
  useBodyBackground();
  const theme = useTheme();
  return (
    <>
      <Section title="Buttons">
        <Button size="small" rounded display="inline" label="Normal button" />
        <Button
          size="small"
          rounded
          display="inline"
          type="primary"
          label="Shuffle play"
        />
        <Button
          size="small"
          rounded
          display="inline"
          type="secondary"
          label="Secondary"
        />

        <Button rounded display="inline" label="Normal button" />
        <Button rounded display="inline" type="primary" label="Shuffle play" />
        <Button rounded display="inline" type="secondary" label="Secondary" />

        <Button size="large" rounded display="inline" label="Normal button" />
        <Button
          size="large"
          rounded
          display="inline"
          type="primary"
          label="Shuffle play"
        />
        <Button
          size="large"
          rounded
          display="inline"
          type="secondary"
          label="Secondary"
        />
      </Section>
      <Section title="Colors">
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
      </Section>
    </>
  );
}

const Section: React.FunctionComponent<{ title: string }> = function Section({
  title,
  children
}) {
  return (
    <View padding="large">
      <View margin={["none", "none", "large", "none"]}>
        <TextLine text={title} type="display" color="white" />
      </View>
      {React.Children.map(children, item => (
        <View margin={["large", "none"]}>{item}</View>
      ))}
    </View>
  );
};

export { ThemeExplorer, ThemeExplorer as default };
