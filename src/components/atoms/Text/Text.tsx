/** @jsx jsx */
import React from "react";
import { jsx, CSSObject } from "@emotion/core";
import { Colors, Theme, Fonts } from "../../../foundations/Theme";

interface Props {
  /* Text content to be rendered. */
  text: string;

  /* Typography type to be used based on runtime theme. */
  type?: keyof Fonts;

  /* HTML tag to be rendered */
  as?: keyof JSX.IntrinsicElements;

  /* Text color */
  color?: keyof Colors;

  /* Number of lines that text will render. Truncation will be used to hide remaining lines. */
  numberOfLines?: number;
}

interface DefaultProps {
  as: keyof JSX.IntrinsicElements;
  color: keyof Colors;
  numberOfLines: number;
  type: keyof Fonts;
}

function Text(
  { as, text, type, color, numberOfLines }: Props & DefaultProps = {
    as: "p",
    text: "",
    numberOfLines: 0,
    color: "neutral",
    type: "body"
  }
) {
  const HTMLNode = as;
  const isTrucated = Boolean(numberOfLines);
  const isSingleLine = numberOfLines === 1;
  const isMultiline = isTrucated && numberOfLines > 1;
  return (
    <HTMLNode
      css={(theme: Theme) => ({
        ...theme.fonts[type],
        color: color ? theme.colors[color] : "inherit",
        lineHeight: `${theme.fonts[type].lineHeight}px`,
        ...(isTrucated && {
          maxHeight: `calc(${
            theme.fonts[type].lineHeight
          }px * ${numberOfLines})` // TODO: px should be added by Theme
        }),
        ...(isSingleLine && {
          whiteSpace: "nowrap"
        }),
        ...(isMultiline && {
          WebkitLineClamp: numberOfLines,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical"
        })
      })}
    >
      {text}
    </HTMLNode>
  );
}

export { Text };
