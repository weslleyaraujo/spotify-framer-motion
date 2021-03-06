/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { TextAlignProperty } from "csstype";
import { useTheme } from "emotion-theming";
import { Children, cloneElement, forwardRef } from "react";
import { Colors } from "../../../foundations/Colors";
import { Theme } from "../../../foundations/Theme";
import { Fonts } from "../../../foundations/Typography";
import { PickEnum } from "../../../utils/pick-enum";

// TODO: Move it to interfaces directory
export type ForegroundColors = PickEnum<
  keyof Colors,
  "absoluteDark" | "absoluteLight" | "foregroundPrimary" | "foregroundSecondary"
>;

export type TextLineProps = {
  /* Typography type to be used based on runtime theme. */
  type?: keyof Fonts;

  /* HTML tag to be rendered */
  as?: keyof JSX.IntrinsicElements;

  /* Text color */
  color?: ForegroundColors;

  /* Number of lines that text will render. Truncation will be used to hide remaining lines. */
  numberOfLines?: number;

  /** Alignment of the text */
  textAlign?: TextAlignProperty;

  /** Renders the text as a block or an inline element. Default: undefined, which renders the "block" behavior (or "inline" for nexted TextLines) */
  display?: "inline" | "block";
} & (
  | {
      children: React.ReactNode;
      text?: never;
    }
  | { children?: never; text: string }
);

interface TextLineDefaultProps
  extends Required<
    Pick<TextLineProps, "numberOfLines" | "type" | "as" | "color">
  > {}

const TextLine = forwardRef(function TextLine(
  props: TextLineProps,
  ref?: React.Ref<TextLineProps>
) {
  const {
    as: Element,
    type,
    text,
    numberOfLines,
    color,
    display,
    children,
    textAlign
  } = props as TextLineProps & TextLineDefaultProps;
  const isTruncated = Boolean(numberOfLines);
  const isSingleLine = numberOfLines === 1;
  const isMultiline = isTruncated && numberOfLines > 1;
  const theme = useTheme<Theme>();
  const styles = css({
    textAlign,
    ...(display && {
      display
    }),
    ...theme.fonts[type],
    color: color ? theme.colors[color] : "inherit",
    lineHeight: `${theme.fonts[type].lineHeight}px`,
    ...(isTruncated && {
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxHeight: `calc(${theme.fonts[type].lineHeight}px * ${numberOfLines})`
    }),
    ...(isSingleLine && {
      whiteSpace: "nowrap"
    }),
    ...(isMultiline && {
      WebkitLineClamp: numberOfLines,
      display: "-webkit-box",
      WebkitBoxOrient: "vertical"
    })
  });

  return (
    // @ts-ignore
    <Element css={styles} ref={ref}>
      {text ||
        Children.map(
          children as React.ReactChild,
          (child: React.ReactChild, index) => {
            switch (typeof child) {
              case "number":
              case "string":
                return child;

              case "object":
                //It's safe to typecast here, given the context of switch
                const { props } = child as React.ReactElement;

                // React.ReactElement doesn't include either name or displayName under their type key, but they're part of the actual object, thus the ignore.
                const isTextLine =
                  // @ts-ignore
                  child.type.name === "TextLine" ||
                  // @ts-ignore
                  child.type.displayName === "TextLine";

                return cloneElement(child, {
                  ...(isTextLine && { as: "span", display: "inline" }),
                  ...props
                });
            }
          }
        )}
    </Element>
  );
});

const defaultProps: TextLineDefaultProps = {
  as: "p",
  type: "body",
  numberOfLines: 0,
  color: "foregroundPrimary"
};

TextLine.defaultProps = defaultProps;

export { TextLine };
