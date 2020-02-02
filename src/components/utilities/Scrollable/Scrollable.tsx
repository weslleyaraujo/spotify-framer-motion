/** @jsx jsx */

import { View, useViewStyles } from "../../atoms/View/View";

import { Children } from "react";
import { Theme } from "../../../foundations/Theme";
import { Units } from "../../../foundations/Spacing";
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";

type InlineItems = boolean;
type MaxVisibleItems = number;

type ScrollableProps = {
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
    }
);

type ScrollableDefaultProps = Required<
  Pick<
    ScrollableProps,
    "inlineItems" | "padding" | "horizontalPadding" | "maxVisibleItems"
  >
>;

function Scrollable({
  children,
  padding,
  horizontalPadding,
  maxVisibleItems,
  inlineItems
}: ScrollableProps & ScrollableDefaultProps) {
  const count = Children.count(children);
  const theme = useTheme<Theme>();
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
              paddingTop: 0,
              paddingBottom: 0,
              display: "inline-block",
              ...(isFirst && { marginLeft: extraPadding / 2 }),
              ...(isLast && { marginRight: extraPadding / 2 })
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

const defaultProps: ScrollableDefaultProps = {
  inlineItems: false,
  padding: "large",
  horizontalPadding: "large",
  maxVisibleItems: 1.2
};

Scrollable.defaultProps = defaultProps;

export { Scrollable };
