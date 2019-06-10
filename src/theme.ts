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
    secondaryDarkest: "#775208",
    secondaryDarker: "#a7730b",
    secondaryDark: "#d7930e",
    secondary: "#F1AD27",
    secondaryLight: "#f4bf57",
    secondaryLighter: "#f7d187",
    secondaryLightest: "#fae4b7",
    complementaryDarkest: "#000",
    complementaryDarker: "#101111",
    complementaryDark: "#292a2b",
    complementary: "#424445",
    complementaryLight: "#5b5e5f",
    complementaryLighter: "#747779",
    complementaryLightest: "#8e9192",
    neutralDarkest: "#000",
    neutralDarker: "#000",
    neutralDark: "#030a15",
    neutral: "#091E42",
    neutralLight: "#0f326f",
    neutralLighter: "#15479c",
    neutralLightest: "#1b5bc9"
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
      fontSize: 36,
      fontWeight: 800,
      fontStyle: "normal",
      lineHeight: 32,
      fontFamily
    },
    body: {
      fontSize: 14,
      fontWeight: 400,
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
      fontSize: 16,
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
  },
  scales: {
    smallest: 24,
    small: 32,
    medium: 48,
    large: 64,
    largest: 96
  }
};

export { theme };
