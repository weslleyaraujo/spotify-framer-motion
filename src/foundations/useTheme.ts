import { useContext } from "react";
import { ThemeContext, Theme } from "./Theme";

function useTheme<T extends string>(): Theme<T> {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("Failed to resolve Theme context");
  }

  return theme as Theme<T>;
}

export { useTheme };
