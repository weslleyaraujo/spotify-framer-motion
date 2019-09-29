import { Scales, Units } from "./Spacing";

import { Colors } from "./Colors";
import { Fonts } from "./Typography";
import React from "react";

export interface Constants {
  borderRadiusLarge: number;
  borderRadiusMedium: number;
  borderRadiusSmall: number;
  borderWidthSmall: number;
  borderWidthMedium: number;
  borderWidthLarge: number;
}

export interface Theme<T extends symbol | string | number | Object = {}> {
  colors: Colors;
  units: Units;
  fonts: Fonts;
  constants: Constants;
  scales: Scales;
  icons: {
    [key in T]: (args: {
      color: string;
      width: number;
      height: number;
    }) => React.ReactElement;
  };
}
