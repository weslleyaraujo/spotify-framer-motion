/** @jsx jsx */
import React, { useCallback } from "react";
import { CSSPseudosForCSSObject, CSSObject } from "@emotion/serialize";
import { jsx, css } from "@emotion/core";
import { Units } from "../../../foundations/Theme";
import { Subtract } from "utility-types";
import {
  FlexDirectionProperty,
  FlexWrapProperty,
  JustifyContentProperty,
  AlignItemsProperty,
  GlobalsNumber,
  PropertiesFallback
} from "csstype";

import { useTheme } from "../../../foundations/useTheme";

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

export interface Props {
  children: React.ReactElement;
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
}

interface DefaultProps extends Required<Pick<Props, "margin" | "padding">> {}

function useViewStyles(
  props: Pick<
    Props & DefaultProps,
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
    padding
  } = props;
  const theme = useTheme();
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
    function mapSpacing(value: Props["margin"] | Props["padding"]) {
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
    function mapRadius(radius: Props["radius"]) {
      switch (radius) {
        case "small":
          return theme.constants.borderRadiusSmall;
        case "medium":
          return theme.constants.borderRadiusMedium;
        case "large":
          return theme.constants.borderRadiusLarge;
        default:
          0;
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
    ...(radius && { borderRadius: mapRadius(radius) }),
    ...(supportsTruncation && { minWidth: 0 }),
    ...(margin && { margin: mapSpacing(margin) }),
    ...(padding && { padding: mapSpacing(padding) }),
    flexDirection: display ? flexDirection : "column"
  };
}

function View(props: Props & DefaultProps) {
  const { children, style } = props;
  const view = useViewStyles(props);

  return (
    <div
      css={{
        ...style,
        ...view
      }}
      children={children}
    />
  );
}

const defaultProps: DefaultProps = {
  margin: "none",
  padding: "none"
};

View.defaultProps = defaultProps;

export { View, useViewStyles };
