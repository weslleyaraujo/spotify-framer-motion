import { Theme } from "./foundations/Theme";
import { IconTypes, icons } from "./foundations/icons";

const fontFamily = "Circular";

const theme: Theme<IconTypes> = {
  icons,
  colors: {
    white: "#FFF",
    black: "#000",
    primaryDarkest: "#083518",
    primaryDarker: "#0f612c",
    primaryDark: "#168d40",
    primary: "#1DB954",
    primaryLight: "#2bde6a",
    primaryLighter: "#57e589",
    primaryLightest: "#83eca8",
    secondaryDarkest: "#000",
    secondaryDarker: "#000",
    secondaryDark: "#000",
    secondary: "#000",
    secondaryLight: "#1a1a1a",
    secondaryLighter: "#333",
    secondaryLightest: "#4d4d4d",
    complementaryDarkest: "#b3b3b3",
    complementaryDarker: "#ccc",
    complementaryDark: "#e6e6e6",
    complementary: "#FFF",
    complementaryLight: "#fff",
    complementaryLighter: "#fff",
    complementaryLightest: "#fff"
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
    smallest: 8,
    smaller: 16,
    small: 32,
    medium: 64,
    large: 64,
    larger: 128,
    largest: 256
  },
  fonts: {
    display: {
      fontSize: 36,
      fontWeight: 800,
      fontStyle: "normal",
      lineHeight: 32,
      fontFamily
    },
    body: {
      fontSize: 14,
      fontWeight: "normal",
      lineHeight: 20,
      fontFamily
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
      fontFamily
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
    },
    featured: {
      fontWeight: 400,
      fontSize: 12,
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
    borderWidthLarge: 2
  }
};

export { theme };
