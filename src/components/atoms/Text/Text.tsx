/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Colors, Fonts } from "../../../foundations/Theme";
import { useTheme } from "../../../foundations/useTheme";

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

interface DefaultProps
  extends Required<Pick<Props, "numberOfLines" | "type" | "as">> {}

function Text({
  as = "a",
  type,
  text,
  numberOfLines,
  color
}: Props & DefaultProps) {
  const HTMLElement = as;
  const isTrucated = Boolean(numberOfLines);
  const isSingleLine = numberOfLines === 1;
  const isMultiline = isTrucated && numberOfLines > 1;
  const theme = useTheme();
  const styles = css({
    ...theme.fonts[type],
    color: color ? theme.colors[color] : "inherit",
    lineHeight: `${theme.fonts[type].lineHeight}px`,
    ...(isTrucated && {
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxHeight: `calc(${theme.fonts[type].lineHeight}px * ${numberOfLines})` // TODO: px should be added by Theme
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

  return <HTMLElement css={styles}>{text}</HTMLElement>;
}

Text.defaultProps = {
  as: "p",
  type: "body",
  color: "grayLight"
};

export { Text };
