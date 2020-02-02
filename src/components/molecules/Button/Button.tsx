/** @jsx jsx */

import { ViewProps, useViewStyles } from "../../atoms/View/View";

import { Action } from "../../atoms/Action/Action";
import { ActionProps } from "../../../interfaces/Card";
import { SetIntersection } from "utility-types";
import { TextLine } from "../../atoms/TextLine/TextLine";
import { Theme } from "../../../foundations/Theme";
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";

interface ButtonProps<T> {
  action: ActionProps<T>;
  type?: "normal" | "primary" | "secondary" | "third";
  size?: SetIntersection<ViewProps["padding"], "medium" | "large" | "small">;
  label: string;
  rounded?: boolean;
  display?: "block" | "inline";
}

interface ButtonDefaultProps<T>
  extends Required<
    Pick<ButtonProps<T>, "action" | "size" | "rounded" | "display" | "type">
  > {}

const MAP_TEXT_COLOR: {
  [key in ButtonDefaultProps<{}>["type"]]: React.ComponentProps<
    typeof TextLine
  >["color"];
} = {
  normal: "absoluteLight",
  primary: "absoluteLight",
  secondary: "absoluteDark"
};

const MAP_TEXT_TYPE: {
  [key in ButtonDefaultProps<{}>["size"]]: React.ComponentProps<
    typeof TextLine
  >["type"];
} = {
  small: "featured",
  medium: "body",
  large: "body"
};

const PADDING_SIZE_MAP: {
  [key in ButtonDefaultProps<{}>["size"]]: Parameters<
    typeof useViewStyles
  >[0]["padding"];
} = {
  small: ["smallest", "medium"],
  medium: ["small", "large"],
  large: ["medium", "larger"]
};

function useButtonStyles(
  props: Pick<
    ButtonProps<{}> & ButtonDefaultProps<{}>,
    "rounded" | "display" | "type"
  >
) {
  const { rounded, display, type } = props;
  const theme = useTheme<Theme>();
  return {
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
    ...(type === "normal" && {
      backgroundColor: theme.colors.complement
    }),

    ...(type === "primary" && {
      backgroundColor: theme.colors.primary,
      textTransform: "uppercase"
    }),

    ...(type === "secondary" && {
      backgroundColor: theme.colors.absoluteLight
    }),

    ...(type === "third" && {
      backgroundColor: "transparent",
      border: `1px solid ${theme.colors.absoluteLight}`,
      textTransform: "uppercase"
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
  };
}

function Button<T = React.HTMLProps<HTMLButtonElement>>(
  props: ButtonProps<T> & ButtonDefaultProps<T>
) {
  const view = useViewStyles({
    padding: PADDING_SIZE_MAP[props.size],
    margin: "none"
  });
  const button = useButtonStyles(props);
  const styles = {
    ...view,
    ...button
  };
  return (
    <Action {...props.action} css={styles}>
      <TextLine
        type={MAP_TEXT_TYPE[props.size]}
        text={props.label}
        color={MAP_TEXT_COLOR[props.type]}
        as="span"
      />
    </Action>
  );
}

const defaultProps: ButtonDefaultProps<React.HTMLProps<HTMLButtonElement>> = {
  size: "medium",
  display: "block",
  type: "normal",
  rounded: true,
  action: {
    as: "button"
  }
};

Button.defaultProps = defaultProps;

export { Button };
