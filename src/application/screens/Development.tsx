import { Button } from "../../components/molecules/Button/Button";
import { Colors } from "../../foundations/Colors";
import React from "react";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { Theme } from "../../foundations/Theme";
import { View } from "../../components/atoms/View/View";
import { useBodyBackground } from "../../hooks/useBodyBackground";
import { useTheme } from "emotion-theming";

interface Props {}

function Development(props: Props) {
  useBodyBackground();
  const theme = useTheme<Theme>();
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
            padding="large"
            style={{
              backgroundColor: theme.colors[key as keyof Colors]
            }}
          >
            <TextLine text={key} numberOfLines={2} />
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
        <TextLine text={title} type="display" color="absoluteLight" />
      </View>
      {React.Children.map(children, item => (
        <View margin={["large", "none"]}>{item}</View>
      ))}
    </View>
  );
};

export { Development, Development as default };
