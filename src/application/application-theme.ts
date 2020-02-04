import { Icons, icons } from "../foundations/icons";

import { Theme } from "../foundations/Theme";

const fontFamily = "Circular";

const theme: Theme<Icons> = {
  icons,
  colors: {
    foregroundPrimary: "#FFFFFF",
    foregroundSecondary: "#B3B3B3",
    absoluteLight: "#FFFFFF",
    absoluteDark: "#18262C",
    background: "#121212",
    backgroundAccent: "#222326",
    complement: "#3586F0",
    primary: "#1DB954",
    callout: "#FF5E36"
  },
  units: {
    smallest: 2,
    smaller: 4,
    small: 8,
    medium: 16,
    large: 32,
    larger: 64,
    largest: 128
  },
  scales: {
    smallest: 6,
    smaller: 12,
    small: 24,
    medium: 46,
    large: 92,
    larger: 184,
    largest: 368
  },
  fonts: {
    display: {
      fontSize: 46,
      fontWeight: 800,
      fontStyle: "normal",
      lineHeight: 46,
      fontFamily: "Circular Black"
    },
    body: {
      fontSize: 14,
      fontWeight: "normal",
      lineHeight: 20,
      fontFamily
    },
    featured: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 20,
      fontFamily: "Circular Bold",
      letterSpacing: 2
    },
    caption: {
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 16,
      fontFamily
    },
    heading: {
      fontWeight: 700,
      fontSize: 22,
      lineHeight: 24,
      fontFamily: "Circular Bold"
    },
    subtitle: {
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 20,
      fontFamily
    },
    title: {
      lineHeight: 22,
      fontWeight: 700,
      fontFamily
    },
    strong: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 20,
      fontFamily
    }
  },
  constants: {
    borderRadiusSmall: 6,
    borderRadiusMedium: 12,
    borderRadiusLarge: 18,
    borderWidthSmall: 0.5,
    borderWidthMedium: 1,
    borderWidthLarge: 2,
    boxShadowOffsetY: 4,
    boxShadowOffsetX: 0,
    boxShadowBlurRadius: 14,
    boxShadowSpreadRadius: 0,
    boxShadowElevation: 4,
    boxShadowOpacity: 0.25
  }
};

export { theme };
