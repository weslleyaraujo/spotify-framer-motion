import React, { useContext } from "react";
import { ThemeContext, Theme } from "./Theme";

function useTheme(): Theme {
  const theme = useContext(ThemeContext as React.Context<Theme | null>);
  console.log({ theme });
  if (!theme) {
    throw new Error("Failed to resolve Theme context");
  }

  return theme;
}

export { useTheme };
