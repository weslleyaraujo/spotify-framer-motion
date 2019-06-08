/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useViewStyles, Props as ViewProps } from "../../atoms/View/View";
import { TextLine } from "../../atoms/TextLine/TextLine";
import { useTheme } from "../../../foundations/useTheme";
import { SetIntersection } from "utility-types";
import { Action } from "../../../interfaces/Action";

interface Props<T> {
  action: Action<T>;
  type?: "primary" | "secondary";
  size?: SetIntersection<ViewProps["padding"], "medium" | "large" | "small">;
  label: string;
  rounded?: boolean;
  display?: "block" | "inline";
}

interface DefaultProps<T>
  extends Required<
    Pick<Props<T>, "action" | "size" | "rounded" | "display" | "type">
  > {}

const MAP_TEXT_COLOR: {
  [key in DefaultProps<{}>["type"]]: React.ComponentProps<
    typeof TextLine
  >["color"]
} = {
  primary: "white",
  secondary: "black"
};

function Button<T = React.HTMLProps<HTMLButtonElement>>({
  rounded,
  action,
  size,
  label,
  display,
  type
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
        verticalAlign: "baseline",
        position: "relative",
        fontWeight: 400,
        ...(rounded && {
          borderRadius: theme.constants.borderRadiusSmall
        }),

        /** Button type */
        ...(type === "primary" && {
          backgroundColor: theme.colors.primary
        }),

        ...(type === "secondary" && {
          backgroundColor: theme.colors.white
        }),

        /** Display */
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
      <TextLine
        type="strong"
        text={label}
        color={MAP_TEXT_COLOR[type]}
        as="span"
      />
    </HTMLElement>
  );
}

const defaultProps: DefaultProps<React.HTMLProps<HTMLButtonElement>> = {
  size: "medium",
  display: "block",
  type: "primary",
  rounded: true,
  action: {
    as: "button"
  }
};

Button.defaultProps = defaultProps;

export { Button };
