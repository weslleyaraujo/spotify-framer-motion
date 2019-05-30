import React from "react";
import { Fonts } from "./Typography";

export interface Colors {
  black: string;
  white: string;
  primary: string;
  secondary: string;
  complementary: string;
  neutral: string;
}

export interface Units {
  smallest: number;
  small: number;
  medium: number;
  large: number;
  largest: number;
}

export interface Scales {
  smallest: number;
  small: number;
  medium: number;
  large: number;
  largest: number;
}

export interface Constants {
  borderRadiusLarge: number;
  borderRadiusMedium: number;
  borderRadiusSmall: number;
}

export interface Theme<T extends string> {
  colors: Colors;
  units: Units;
  fonts: Fonts;
  constants: Constants;
  scales: Scales;
  icons: Record<
    T,
    (args: {
      color: string;
      width: number;
      height: number;
    }) => React.ReactElement
  >;
}

export const ThemeContext = React.createContext<Theme<any> | null>(null);
