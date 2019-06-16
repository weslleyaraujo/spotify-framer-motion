/** @jsx jsx */
import { Children } from "react";
import { jsx } from "@emotion/core";
import { View, useViewStyles } from "../../atoms/View/View";
import { useTheme } from "../../../foundations/useTheme";
import { Units } from "../../../foundations/Theme";

type InlineItems = boolean;
type MaxVisibleItems = number;

type Props = {
  children: React.ReactNode;
  padding: React.ComponentProps<typeof View>["padding"];
  horizontalPadding: keyof Units;
} & (
  | {
      inlineItems?: never;
      maxVisibleItems: MaxVisibleItems;
    }
  | {
      inlineItems: InlineItems;
      maxVisibleItems?: never;
    });

type DefaultProps = Required<
  Pick<
    Props,
    "inlineItems" | "padding" | "horizontalPadding" | "maxVisibleItems"
  >
>;

function Scrollable({
  children,
  padding,
  horizontalPadding,
  maxVisibleItems,
  inlineItems
}: Props & DefaultProps) {
  const count = Children.count(children);
  const theme = useTheme();
  const view = useViewStyles({
    padding,
    margin: "none"
  });

  return (
    <div
      css={{
        WebkitTapHighlightColor: "transparent",
        WebkitOverflowScrolling: "touch",
        overflowY: "hidden",
        overflowX: "scroll",
        whiteSpace: "nowrap",

        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          display: "none"
        }
      }}
    >
      {Children.map(children, (child, index) => {
        const isFirst = index === 0;
        const isLast = index === count - 1;
        const extraPadding = theme.units[horizontalPadding];
        return (
          <div
            css={{
              ...view,
              ...(!inlineItems && {
                width: `calc(100% / ${maxVisibleItems})`
              }),
              ...(isFirst && { paddingLeft: extraPadding }),
              ...(isLast && { paddingRight: extraPadding }),
              display: "inline-block"
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

const defaultProps: DefaultProps = {
  inlineItems: false,
  padding: "large",
  horizontalPadding: "large",
  maxVisibleItems: 1.2
};

Scrollable.defaultProps = defaultProps;

export { Scrollable };
