import { ActivityIndicator } from "../../atoms/ActivityIndicator/ActivityIndicator";
import React from "react";
import { Splash } from "../../molecules/Splash/Splash";
import { Theme } from "../../../foundations/Theme";
import { useBodyBackground } from "../../../hooks/use-body-background";
import { useTheme } from "emotion-theming";

function LoadingView() {
  const theme = useTheme<Theme>();
  useBodyBackground({
    color: theme.colors.background,
    gradientStyle: "topLeft"
  });
  return (
    <Splash>
      <ActivityIndicator />
    </Splash>
  );
}

export { LoadingView };
