/** @jsx jsx */

import React, { useMemo } from "react";

import { Colors } from "../../../foundations/Colors";
import { Scales } from "../../../foundations/Spacing";
import { Theme } from "../../../foundations/Theme";
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";

interface Props<T> {
  color: keyof Colors;
  size: keyof Scales;
  type: T;
}

interface DefaultProps<T> extends Required<Pick<Props<T>, "color" | "size">> {}

function Icon<T = void>({
  color,
  size,
  type
}: Props<
  T extends void ? "Missing icons list. E.g <Icon<'foo' | 'bar'> />" : string
> &
  DefaultProps<T>): React.ReactElement {
  const theme = useTheme<Theme<T>>();
  const dimensions = theme.scales[size];
  const el = useMemo(() => {
    // TODO: figure out why theme.icons are not typed :(
    // @ts-ignore
    const factory = theme.icons[type];
    return factory({
      width: dimensions,
      height: dimensions,
      color: theme.colors[color]
    });
  }, [dimensions, theme, color, type]);

  return (
    <>
      {React.Children.map(el, (root: React.ReactElement<any>) =>
        React.cloneElement(root, {
          width: dimensions,
          height: dimensions,
          stroke: theme.colors[color],
          children: React.Children.map(
            root.props.children,
            (child: React.ReactElement<any>) => React.cloneElement(child)
          )
        })
      )}
    </>
  );
}

const defaultProps: DefaultProps<""> = {
  color: "foregroundPrimary",
  size: "medium"
};

Icon.defaultProps = defaultProps;

export { Icon };
