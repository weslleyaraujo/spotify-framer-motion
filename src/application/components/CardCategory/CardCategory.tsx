/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { Action } from "../../../components/atoms/Action/Action";
import { Picture } from "../../../components/atoms/Picture/Picture";
import { TextLine } from "../../../components/atoms/TextLine/TextLine";
import { View } from "../../../components/atoms/View/View";
import { Theme } from "../../../foundations/Theme";
import { useBoxShadow } from "../../../hooks/use-box-shadow";
import { CardProps } from "../../../interfaces/Card";

interface CategoryCardProps<P extends Object>
  extends CardProps<{
    required: "interactions" | "media" | "title";
    actions: {
      primary: P;
    };
    interactions: "primary";
  }> {
  background: {
    from: string;
    to: string;
  };
}

function CategoryCard<P>({
  interactions,
  media,
  title,
  background
}: CategoryCardProps<P>) {
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
          backgroundImage: `linear-gradient(to bottom, ${background.from} 0px, ${background.to} 100%)`
        }}
      >
        <div
          css={{
            position: "absolute",
            left: theme.units.medium,
            top: theme.units.medium,
            width: "50%",
            minWidth: 0
          }}
        >
          <TextLine text={title} type="strong" numberOfLines={2} />
        </div>
        <div
          css={{
            position: "relative"
          }}
        >
          <div
            css={{
              position: "relative",
              right: `-${dimensions}px`,
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
        </div>
      </View>
    </Action>
  );
}

export { CategoryCard };
