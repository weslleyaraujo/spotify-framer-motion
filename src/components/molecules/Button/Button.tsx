/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useViewStyles, Props as ViewProps } from "../../atoms/View/View";
import { Text } from "../../atoms/Text/Text";
import { useTheme } from "../../../foundations/useTheme";
import { SetIntersection } from "utility-types";
import { Action } from "../../../interfaces/Action";

interface Props<T> {
  action: Action<T>;
  size?: SetIntersection<ViewProps["padding"], "medium" | "large" | "small">;
  label: string;
  rounded?: boolean;
  display?: "block" | "inline";
}

interface DefaultProps<T>
  extends Required<Pick<Props<T>, "action" | "size" | "rounded" | "display">> {}

function Button<T = React.HTMLProps<HTMLButtonElement>>({
  rounded,
  action,
  size,
  label,
  display
}: Props<T> & DefaultProps<T>) {
  const { as: HTMLElement, ...props } = action;
  const theme = useTheme();
  const styles = useViewStyles({
    padding: size,
    margin: "none"
  });

  return (
    <HTMLElement
      {...props}
      css={css({
        ...styles,
        outline: 0,
        margin: 0,
        cursor: "pointer",
        backgroundImage: "none",
        whiteSpace: "nowrap",
        userSelect: "none",
        textDecoration: "none",
        textTransform: "none",
        overflow: "visible",
        touchAction: "manipulation",
        border: "none",
        boxSizing: "border-box",
        justifyContent: "center",
        alignItems: "center",
        color: theme.colors.white,
        verticalAlign: "baseline",
        position: "relative",
        fontWeight: 400,
        borderRadius: theme.constants.borderRadiusSmall,
        backgroundColor: theme.colors.primary,
        ...(display === "block" && {
          width: "100%",
          display: "flex"
        }),
        ...(display === "inline" && {
          display: "inline-flex"
        }),
        "&:disabled": {
          cursor: "not-allowed"
        },
        "&:active, &:focus": {
          outline: 0
        },
        "&:not([disabled]):hover": {
          textDecoration: "none"
        },
        "&:not([disabled]):active": {
          outline: "0",
          transition: "none"
        },
        "&[disabled] > *": {
          pointerEvents: "none"
        },
        // TODO: disabled styles
        "&[disabled], &[disabled]:hover, &[disabled]:active": {
          cursor: "not-allowed",
          textDecoration: "none",
          outline: 0,
          transition: "none"
        },
        ...(rounded && {
          borderRadius: 40000
        })
      })}
    >
      <Text type="strong" text={label} color="white" as="span" />
    </HTMLElement>
  );
}

const defaultProps: DefaultProps<React.HTMLProps<HTMLButtonElement>> = {
  size: "medium",
  display: "block",
  rounded: true,
  action: {
    as: "button"
  }
};

Button.defaultProps = defaultProps;

export { Button };
