/** @jsx jsx */
import React from "react";
import { useTheme } from "../../../foundations/useTheme";
import { Colors, Scales } from "../../../foundations/Theme";

interface Props {
  color: keyof Colors;
  size: keyof Scales;
}

function Icon() {
  const theme = useTheme();

  // return React.Children.map(
  //   factory({ width, height, color: theme.color[color] }),
  //   (root: React.ReactElement<any>) =>
  //     React.cloneElement(root, {
  //       width,
  //       height,
  //       children: React.Children.map(
  //         root.props.children,
  //         (child: React.ReactElement<any>) =>
  //           React.cloneElement(child, {
  //             fill: theme.color[color]
  //           })
  //       )
  //     })
  // );
}
