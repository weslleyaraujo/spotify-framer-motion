/** @jsx jsx */
import React from "react";
import { jsx, ThemeContext } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import { Theme } from "./foundations/Theme";
import { Text } from "./components/atoms/Text/Text";

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
      lineHeight: 32
    },
    caption: {
      lineHeight: 32
    },
    heading: {
      lineHeight: 32
    },
    subtitle: {
      lineHeight: 32
    },
    title: {
      lineHeight: 32
    },
    strong: {
      lineHeight: 32
    }
  }
};

function App() {
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        hey
        <ThemeContext.Consumer>
          {args => JSON.stringify(args)}
        </ThemeContext.Consumer>
        <Text
          type="display"
          as="p"
          text="Flash Cards"
          color="primary"
          numberOfLines={0}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
