import { Fonts } from "./Typography";
import React from "react";

export interface Colors {
  absoluteDark: string;
  absoluteLight: string;
  foregroundPrimary: string;
  foregroundSecondary: string;
  background: string;
  backgroundAccent: string;
  primary: string;
  complement: string;
  callout: string;
}

export interface Units {
  smallest: number;
  smaller: number;
  small: number;
  medium: number;
  large: number;
  larger: number;
  largest: number;
}

export interface Scales extends Units {}

export interface Constants {
  borderRadiusLarge: number;
  borderRadiusMedium: number;
  borderRadiusSmall: number;
  borderWidthSmall: number;
  borderWidthMedium: number;
  borderWidthLarge: number;
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
