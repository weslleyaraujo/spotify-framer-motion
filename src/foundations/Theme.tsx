import React from "react";
import { IconTypes, icons } from "./icons";
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

const theme: Theme<IconTypes> = {
  icons,
  colors: {
    black: "#000",
    white: "#FFF",
    primary: "#E73438",
    secondary: "#F1AD27",
    complementary: "#06BF73",
    neutral: "#091E42"
  },
  units: {
    smallest: 2,
    small: 4,
    medium: 8,
    large: 16,
    largest: 32
  },
  fonts: {
    display: {
      fontSize: 30,
      fontWeight: 800,
      fontStyle: "normal",
      lineHeight: 32,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    body: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 20,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    caption: {
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 16,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    heading: {
      fontWeight: 700,
      fontSize: 22,
      lineHeight: 24,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    subtitle: {
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 20,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    title: {
      lineHeight: 22,
      fontWeight: 700,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    strong: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 20,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    featured: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 20,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    }
  },
  constants: {
    borderRadiusSmall: 6,
    borderRadiusMedium: 12,
    borderRadiusLarge: 18
  },
  scales: {
    smallest: 24,
    small: 32,
    medium: 48,
    large: 64,
    largest: 96
  }
};

export const ThemeContext = React.createContext(theme);
