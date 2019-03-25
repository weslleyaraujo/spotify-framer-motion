/** @jsx jsx */
import React from "react";
import { jsx, ThemeContext } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import { Theme } from "./foundations/Theme";
import { Text } from "./components/atoms/Text/Text";

function App() {
  return (
    <Text
      type="heading"
      text="Lorem ipsum dollor sit ammet stuff here blah example"
      color="neutral"
      numberOfLines={2}
    />
  );
}

export default App;
