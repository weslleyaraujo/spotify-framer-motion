/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { Theme } from "../../../foundations/Theme";
import { TextLine } from "../../../components/atoms/TextLine/TextLine";
import { CardProps } from "../../../interfaces/Card";
import { Action } from "../../../components/atoms/Action/Action";
import { Picture } from "../../../components/atoms/Picture/Picture";
import { View } from "../../../components/atoms/View/View";
import { useBoxShadow } from "../../../hooks/use-box-shadow";

interface Props<P extends Object>
  extends CardProps<{
    required: "interactions" | "media" | "title";
    actions: {
      primary: P;
    };
    interactions: "primary";
  }> {}

interface DefaultProps extends Required<Pick<Props<{}>, "interactions">> {}

function CategoryCard<P>({ interactions, media, title }: Props<P>) {
  const theme = useTheme<Theme>();
  const boxShadow = useBoxShadow({
    color: theme.colors.absoluteDark
  });
  const dimensions = 80;
  return (
    <Action {...interactions.primary.action}>
      <View
        radius="small"
        justify="space-between"
        padding={["medium", "medium", "smaller", "medium"]}
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: theme.colors.callout
        }}
      >
        <View
          css={{
            width: "50%"
          }}
        >
          <TextLine text={title} type="strong" />
        </View>
        <View
          css={{
            width: "50%",
            position: "relative"
          }}
        >
          <div
            css={{
              position: "relative",
              right: `-${dimensions / 2.5}px`,
              top: theme.units.small,
              transform: "rotate(30deg)",
              boxShadow
            }}
          >
            <Picture
              {...media}
              alt={title}
              width={dimensions}
              height={dimensions}
            />
          </div>
        </View>
      </View>
    </Action>
  );
}

export { CategoryCard };
