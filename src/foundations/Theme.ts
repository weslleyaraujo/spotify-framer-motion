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
