/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useMemo } from "react";
import { useTheme } from "../../../foundations/useTheme";
import { Colors, Scales } from "../../../foundations/Theme";

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
  const theme = useTheme();
  const dimensions = theme.scales[size];
  const el = useMemo(() => {
    const factory = theme.icons[type];
    return factory({
      width: dimensions,
      height: dimensions,
      color: theme.colors[color]
    });
  }, [dimensions, theme]);

  return (
    <>
      {React.Children.map(el, (root: React.ReactElement<any>) =>
        React.cloneElement(root, {
          width: dimensions,
          height: dimensions,
          children: React.Children.map(
            root.props.children,
            (child: React.ReactElement<any>) =>
              React.cloneElement(child, {
                fill: theme.colors[color]
              })
          )
        })
      )}
    </>
  );
}

const defaultProps: DefaultProps<""> = {
  color: "neutral",
  size: "medium"
};

Icon.defaultProps = defaultProps;

export { Icon };
