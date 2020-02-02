/** @jsx jsx */

import {
  AlignItemsProperty,
  FlexDirectionProperty,
  FlexWrapProperty,
  GlobalsNumber,
  JustifyContentProperty,
  PropertiesFallback,
  FlexProperty
} from "csstype";
import { CSSObject, CSSPseudosForCSSObject } from "@emotion/serialize";

import { Subtract } from "utility-types";
import { Theme } from "../../../foundations/Theme";
import { Units } from "../../../foundations/Spacing";
import { jsx } from "@emotion/core";
import { useCallback, forwardRef } from "react";
import { useTheme } from "emotion-theming";

type Value = keyof Units | "none";
type Spacing =
  | Value
  | [Value]
  | [Value, Value]
  | [Value, Value, Value]
  | [Value, Value, Value, Value];

interface ValidCSSProperties
  extends PropertiesFallback<number | string>,
    CSSPseudosForCSSObject {}

type ClashingCSSProperties =
  | "display"
  | "borderRadius"
  | "padding"
  | "paddingTop"
  | "paddingRight"
  | "paddingBottom"
  | "paddingLeft"
  | "margin"
  | "marginTop"
  | "marginRight"
  | "marginBottom"
  | "marginLeft"
  | "flexGrow"
  | "flex"
  | "flexDirection"
  | "flexWrap"
  | "alignItems"
  | "justifyContent";

type ViewStyles = Subtract<
  ValidCSSProperties,
  { [P in ClashingCSSProperties]?: CSSObject[P] }
>;

export interface ViewProps {
  children: React.ReactNode;
  margin?: Spacing;
  padding?: Spacing;
  radius?: "small" | "medium" | "large";
  grow?: GlobalsNumber;
  justify?: JustifyContentProperty;
  align?: AlignItemsProperty;
  direction?: FlexDirectionProperty;
  wrap?: FlexWrapProperty;
  supportsTruncation?: boolean;
  style?: ViewStyles;
  debugTrace?: boolean;
  flex?: FlexProperty<number>;
}

interface ViewDefaultProps
  extends Required<Pick<ViewProps, "margin" | "padding">> {}

function useViewStyles(
  props: Pick<
    ViewProps,
    | "margin"
    | "padding"
    | "radius"
    | "style"
    | "supportsTruncation"
    | "wrap"
    | "align"
    | "justify"
    | "direction"
    | "grow"
    | "flex"
    | "debugTrace"
  >
) {
  const {
    margin,
    radius,
    style,
    supportsTruncation,
    wrap: flexWrap,
    align: alignItems,
    justify: justifyContent,
    direction: flexDirection,
    grow: flexGrow,
    padding,
    debugTrace,
    flex
  } = props;
  const theme = useTheme<Theme>();
  const display = [
    justifyContent,
    alignItems,
    flexWrap,
    flexGrow,
    flexDirection
  ].some(Boolean)
    ? "flex"
    : undefined;

  const convert = useCallback(
    (unit: Spacing) =>
      unit === "none"
        ? 0
        : `${theme.units[unit as keyof typeof theme.units]}px`,
    [theme]
  );

  const mapSpacing = useCallback(
    function mapSpacing(value: ViewProps["margin"] | ViewProps["padding"]) {
      if (!value) {
        return 0;
      }

      return Array.isArray(value)
        ? value.map(convert).join(" ")
        : convert(value);
    },
    [convert]
  );

  const mapRadius = useCallback(
    function mapRadius(radius: ViewProps["radius"]) {
      switch (radius) {
        case "small":
          return theme.constants.borderRadiusSmall;
        case "medium":
          return theme.constants.borderRadiusMedium;
        case "large":
          return theme.constants.borderRadiusLarge;
        default:
          return 0;
      }
    },
    [theme.constants]
  );

  return {
    ...style,
    display,
    justifyContent,
    alignItems,
    flexWrap,
    flexGrow,
    flex,
    flexDirection: display ? flexDirection : "column",
    ...(debugTrace &&
      process.env.NODE_ENV === "development" && {
        outline: "1px dashed red"
      }),
    ...(radius && { borderRadius: mapRadius(radius) }),
    ...(supportsTruncation && { minWidth: 0 }),
    ...(margin && { margin: mapSpacing(margin) }),
    ...(padding && { padding: mapSpacing(padding) })
  };
}

const View = forwardRef(function View(
  props: ViewProps,
  ref?: React.Ref<HTMLDivElement>
) {
  const { children, style } = props;
  const view = useViewStyles(props);

  return (
    <div
      ref={ref}
      css={{
        ...view,
        ...style
      }}
      children={children}
    />
  );
});

const defaultProps: ViewDefaultProps = {
  margin: "none",
  padding: "none"
};

View.defaultProps = defaultProps;

export { View, useViewStyles };
