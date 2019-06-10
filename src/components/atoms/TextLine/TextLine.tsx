/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Colors } from "../../../foundations/Theme";
import { useTheme } from "../../../foundations/useTheme";
import { Fonts } from "../../../foundations/Typography";

export interface Props {
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
  extends Required<Pick<Props, "numberOfLines" | "type" | "as" | "color">> {}

function TextLine({
  as,
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

  return <HTMLElement css={styles}>{text}</HTMLElement>;
}

const defaultProps: DefaultProps = {
  as: "p",
  type: "body",
  numberOfLines: 1,
  color: "black"
};

TextLine.defaultProps = defaultProps;

export { TextLine };
