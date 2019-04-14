/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { useViewStyles, Props as ViewProps } from "../../atoms/View/View";
import { Text } from "../../atoms/Text/Text";
import { useTheme } from "../../../foundations/useTheme";

interface Props {
  as?: keyof JSX.IntrinsicElements;
  size?: ViewProps["padding"];
  label: string;
}

interface DefaultProps extends Required<Pick<Props, "as" | "size">> {}

function Button({ as, size, label }: Props & DefaultProps) {
  const HTMLElement = as;
  const theme = useTheme();
  const styles = useViewStyles({
    padding: "large",
    margin: "none"
  });

  return (
    <HTMLElement
      css={css({
        ...styles,
        display: "flex",
        outline: 0,
        margin: 0,
        cursor: "pointer",
        whiteSpace: "nowrap",
        userSelect: "none",
        textDecoration: "none",
        textTransform: "none",
        overflow: "visible",
        touchAction: "manipulation",
        border: "none",
        boxSizing: "border-box",
        borderRadius: theme.constants.borderRadiusSmall
      })}
    >
      <Text type="strong" text={label} />
    </HTMLElement>
  );
}

const defaultProps: DefaultProps = {
  as: "button",
  size: "medium"
};

Button.defaultProps = defaultProps;

export { Button };
