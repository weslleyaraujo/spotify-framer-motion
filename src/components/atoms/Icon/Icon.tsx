/** @jsx jsx */

import React, { useMemo } from "react";

import { Colors } from "../../../foundations/Colors";
import { Scales } from "../../../foundations/Spacing";
import { Theme } from "../../../foundations/Theme";
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";

interface IconProps<T> {
  color: keyof Colors;
  size: keyof Scales;
  type: T;
}

interface IconDefaultProps<T>
  extends Required<Pick<IconProps<T>, "color" | "size">> {}

function Icon<T extends keyof any>({
  color,
  size,
  type
}: IconProps<T> & IconDefaultProps<T>): React.ReactElement {
  const theme = useTheme<Theme<T>>();
  const dimensions = theme.scales[size];
  const el = useMemo(() => {
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

const defaultProps: IconDefaultProps<""> = {
  color: "foregroundPrimary",
  size: "medium"
};

Icon.defaultProps = defaultProps;

export { Icon };
