import { BoxShadowProperty } from "csstype";
import { transparentize } from "polished";
import { Theme } from "../foundations/Theme";
import { useTheme } from "emotion-theming";
import { useMemo } from "react";

function useBoxShadow({ color }: { color: string }): BoxShadowProperty {
  const theme = useTheme<Theme>();
  const {
    constants: {
      boxShadowOffsetX,
      boxShadowOffsetY,
      boxShadowSpreadRadius,
      boxShadowBlurRadius,
      boxShadowOpacity
    }
  } = theme;

  /* offset-x | offset-y | blur-radius | spread-radius | color */

  return useMemo(
    () =>
      [
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius
      ]
        .map(value => `${value}px`)
        .join(transparentize(1 - boxShadowOpacity, color)),
    [
      boxShadowBlurRadius,
      boxShadowOffsetX,
      boxShadowOffsetY,
      boxShadowOpacity,
      boxShadowSpreadRadius,
      color
    ]
  );
}

export { useBoxShadow };
