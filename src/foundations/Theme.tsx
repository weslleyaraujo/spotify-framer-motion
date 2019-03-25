import React from "react";
import { CSSObject } from "@emotion/core";

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

export interface Typography
  extends Partial<
      Pick<
        CSSObject,
        | "font"
        | "fontFamily"
        | "fontFeatureSettings"
        | "fontKerning"
        | "fontLanguageOverride"
        | "fontOpticalSizing"
        | "fontSize"
        | "fontSizeAdjust"
        | "fontStretch"
        | "fontStyle"
        | "fontSynthesis"
        | "fontVariant"
        | "fontVariantCaps"
        | "fontVariantEastAsian"
        | "fontVariantLigatures"
        | "fontVariantNumeric"
        | "fontVariantPosition"
        | "fontVariationSettings"
        | "fontWeight"
        | "letterSpacing"
        | "lineBreak"
        | "lineHeightStep"
        | "textAlign"
        | "textAlignLast"
        | "textCombineUpright"
        | "textDecorationColor"
        | "textDecorationLine"
        | "textDecorationSkip"
        | "textDecorationSkipInk"
        | "textDecorationStyle"
        | "textEmphasisColor"
        | "textEmphasisPosition"
        | "textEmphasisStyle"
        | "textIndent"
        | "textJustify"
        | "textOrientation"
        | "textOverflow"
        | "textRendering"
        | "textShadow"
        | "textSizeAdjust"
        | "textTransform"
        | "textUnderlinePosition"
        | "whiteSpace"
        | "letterSpacing"
      >
    >,
    Required<Pick<CSSObject, "lineHeight">> {}

export interface Fonts {
  display: Typography;
  heading: Typography;
  title: Typography;
  subtitle: Typography;
  caption: Typography;
  body: Typography;
  strong: Typography;
}

export interface Theme {
  colors: Colors;
  units: Units;
  fonts: Fonts;
}

const theme: Theme = {
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
      lineHeight: 32,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    caption: {
      lineHeight: 32,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    heading: {
      lineHeight: 32,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    subtitle: {
      lineHeight: 32,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    title: {
      lineHeight: 32,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    strong: {
      lineHeight: 32,
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    }
  }
};

export const ThemeContext = React.createContext<Theme>(theme);
