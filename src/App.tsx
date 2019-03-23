/** @jsx jsx */
import React from "react";
import { jsx, CSSObject } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";

interface Colors {
  black: string;
  white: string;
  primary: string;
  secondary: string;
  complementary: string;
}

interface Units {
  smallest: number;
  small: number;
  medium: number;
  large: number;
  largest: number;
}

interface Typography
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
      | "lineHeight"
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
      | "lineHeight"
    >
  > {}

interface Fonts {
  display: Typography;
  heading: Typography;
  title: Typography;
  subtitle: Typography;
  caption: Typography;
  body: Typography;
  strong: Typography;
}

interface Theme {
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
    complementary: "#06BF73"
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
      fontFamily:
        "BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif"
    },
    body: {},
    caption: {},
    heading: {},
    subtitle: {},
    title: {},
    strong: {}
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        css={(theme: Theme) => ({
          ...theme.fonts.display,
          backgroundColor: theme.colors.complementary
        })}
      >
        Hover to change color.
      </div>
    </ThemeProvider>
  );
}

export default App;
