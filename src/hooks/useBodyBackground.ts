import { useLayoutEffect } from "react";
import { useTheme } from "../foundations/useTheme";
import { transparentize } from "polished";

type GradientStyle = "topLeft";

const GRADIENT_STYLE_MAP: {
  [key in GradientStyle]: ({
    color,
    backgroundColor
  }: {
    color: string;
    backgroundColor: string;
  }) => CSSStyleDeclaration["backgroundImage"];
} = {
  topLeft: ({ color, backgroundColor }) => `linear-gradient(
      140deg,
      ${transparentize(0.62, color)} 0%,
      ${backgroundColor} 67%
    )`
};

function useBodyBackground(
  {
    color,
    gradientStyle
  }: {
    color: string;
    gradientStyle: GradientStyle;
  } = {
    color: "#FFF",
    gradientStyle: "topLeft"
  }
) {
  const theme = useTheme();
  const { body } = document;

  useLayoutEffect(() => {
    const {
      backgroundImage,
      backgroundColor,
      backgroundRepeat,
      backgroundAttachment
    } = window.getComputedStyle(body);

    body.style.backgroundAttachment = "scroll";
    body.style.backgroundColor = theme.colors.background;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundImage = GRADIENT_STYLE_MAP[gradientStyle]({
      color,
      backgroundColor: theme.colors.background
    });

    return () => {
      body.style.backgroundAttachment = backgroundAttachment;
      body.style.backgroundColor = backgroundColor;
      body.style.backgroundRepeat = backgroundRepeat;
      body.style.backgroundImage = backgroundImage;
    };
  }, [body, color, gradientStyle, theme.colors.background]);
}

export { useBodyBackground };
