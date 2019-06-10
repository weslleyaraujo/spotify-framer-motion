import React from "react";
import { Fonts } from "./Typography";

export interface Colors {
  black: string;
  white: string;

  primaryDarkest: string;
  primaryDarker: string;
  primaryDark: string;
  primary: string;
  primaryLight: string;
  primaryLighter: string;
  primaryLightest: string;

  secondaryDarkest: string;
  secondaryDarker: string;
  secondaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryLighter: string;
  secondaryLightest: string;

  complementaryDarkest: string;
  complementaryDarker: string;
  complementaryDark: string;
  complementary: string;
  complementaryLight: string;
  complementaryLighter: string;
  complementaryLightest: string;

  neutralDarkest: string;
  neutralDarker: string;
  neutralDark: string;
  neutral: string;
  neutralLight: string;
  neutralLighter: string;
  neutralLightest: string;
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
