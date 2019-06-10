/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useViewStyles, Props as ViewProps } from "../../atoms/View/View";
import { TextLine } from "../../atoms/TextLine/TextLine";
import { useTheme } from "../../../foundations/useTheme";
import { SetIntersection } from "utility-types";
import { Action } from "../../../interfaces/Action";

interface Props<T> {
  action: Action<T>;
  type?: "normal" | "primary" | "secondary";
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
  normal: "white",
  primary: "white",
  secondary: "black"
};

const MAP_TEXT_TYPE: {
  [key in DefaultProps<{}>["size"]]: React.ComponentProps<
    typeof TextLine
  >["type"]
} = {
  small: "featured",
  medium: "body",
  large: "body"
};

const PADDING_SIZE_MAP: {
  [key in DefaultProps<{}>["size"]]: Parameters<
    typeof useViewStyles
  >[0]["padding"]
} = {
  small: ["smallest", "medium"],
  medium: ["small", "large"],
  large: ["medium", "larger"]
};

function useButtonStyles(
  props: Pick<Props<{}> & DefaultProps<{}>, "rounded" | "display" | "type">
) {
  const { rounded, display, type } = props;
  const theme = useTheme();
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
      backgroundColor: theme.colors.secondaryLightest
    }),

    ...(type === "primary" && {
      backgroundColor: theme.colors.primary,
      textTransform: "uppercase"
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
  };
}

function Button<T = React.HTMLProps<HTMLButtonElement>>(
  props: Props<T> & DefaultProps<T>
) {
  const { action } = props;
  const { as: HTMLElement, ...actionProps } = action;
  const view = useViewStyles({
    padding: PADDING_SIZE_MAP[props.size],
    margin: "none"
  });
  const button = useButtonStyles(props);
  return (
    <HTMLElement
      {...actionProps}
      css={{
        ...view,
        ...button
      }}
    >
      <TextLine
        type={MAP_TEXT_TYPE[props.size]}
        text={props.label}
        color={MAP_TEXT_COLOR[props.type]}
        as="span"
      />
    </HTMLElement>
  );
}

const defaultProps: DefaultProps<React.HTMLProps<HTMLButtonElement>> = {
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
