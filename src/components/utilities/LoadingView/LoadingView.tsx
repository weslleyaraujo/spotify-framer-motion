import { ActivityIndicator } from "../../atoms/ActivityIndicator/ActivityIndicator";
import React from "react";
import { Splash } from "../../molecules/Splash/Splash";
import { useBodyBackground } from "../../../hooks/useBodyBackground";
import { useTheme } from "../../../foundations/useTheme";

function LoadingView() {
  const theme = useTheme();
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
