import { Scales, Units } from "./Spacing";

import { Colors } from "./Colors";
import { Fonts } from "./Typography";
import { Icons } from "./icons";
import React from "react";
import { Constants } from "./Constants";

// TODO: do not include icons in this interface
export interface Theme<T extends keyof any = Icons> {
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
