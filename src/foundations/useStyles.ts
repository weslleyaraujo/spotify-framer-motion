import { useMemo } from "react";
import { useTheme } from "./useTheme";
import { Theme } from "./Theme";
import css, { CSSObject, SerializedStyles } from "@emotion/css";

type Definition<T> = { [P in keyof T]: CSSObject };
type NamedStyles<T> = { [P in keyof T]: string };
type Factory<T> = (theme: Theme) => Definition<T>;

function createStylesheet<T extends NamedStyles<T>>(
  stylesheet: Definition<T>
): NamedStyles<T> {
  return Object.keys(stylesheet).reduce((acc, n) => {
    const serialized = css(stylesheet[n as keyof typeof stylesheet]);
    return {
      ...acc,
      [n]: `css-${serialized.name}`
    };
  }, {}) as T;
}

function useStyles<T>(styles: Factory<T>): NamedStyles<T> {
  const theme = useTheme();
  return useMemo(() => createStylesheet(styles(theme)), [styles, theme]);
}

export { useStyles };
