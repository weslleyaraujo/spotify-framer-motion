/** @jsx jsx */

import { css, jsx } from "@emotion/core";

import { Colors } from "../../../foundations/Theme";
import { Fonts } from "../../../foundations/Typography";
import { PickEnum } from "../../../utils/pick-enum";
import { useTheme } from "../../../foundations/useTheme";

export type ForegroundColors = PickEnum<
  keyof Colors,
  "absoluteDark" | "absoluteLight" | "foregroundPrimary" | "foregroundSecondary"
>;

export interface Props {
  /* Text content to be rendered. */
  text: string;

  /* Typography type to be used based on runtime theme. */
  type?: keyof Fonts;

  /* HTML tag to be rendered */
  as?: keyof JSX.IntrinsicElements;

  /* Text color */
  color?: ForegroundColors;

  /* Number of lines that text will render. Truncation will be used to hide remaining lines. */
  numberOfLines?: number;
}

interface DefaultProps
  extends Required<Pick<Props, "numberOfLines" | "type" | "as" | "color">> {}

function TextLine({
  as,
  type,
  text,
  numberOfLines,
  color
}: Props & DefaultProps) {
  const ActionElement = as;
  const isTruncated = Boolean(numberOfLines);
  const isSingleLine = numberOfLines === 1;
  const isMultiline = isTruncated && numberOfLines > 1;
  const theme = useTheme();
  const styles = css({
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

  return <ActionElement css={styles}>{text}</ActionElement>;
}

const defaultProps: DefaultProps = {
  as: "p",
  type: "body",
  numberOfLines: 1,
  color: "foregroundPrimary"
};

TextLine.defaultProps = defaultProps;

export { TextLine };
