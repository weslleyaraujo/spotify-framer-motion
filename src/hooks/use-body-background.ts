import { Theme } from "../foundations/Theme";
import { transparentize } from "polished";
import { useLayoutEffect, useRef } from "react";
import { useTheme } from "emotion-theming";

type GradientStyle = "topLeft" | "topBottom";

const entries = Object.entries as <T>(
  o: T
) => [Extract<keyof T, string>, T[keyof T]][];

const GRADIENT_STYLE_MAP: {
  [key in GradientStyle]: ({
    color,
    backgroundColor
  }: {
    color: string;
    backgroundColor: string;
  }) => CSSStyleDeclaration["backgroundImage"];
} = {
  topBottom: ({ color, backgroundColor }) => `linear-gradient(
      180deg,
      ${transparentize(0.62, color)} 0%,
      ${backgroundColor} 67%
    )`,
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
  const {
    colors: { background }
  } = useTheme<Theme>();
  const initial = useRef(() => {
    const style = window.getComputedStyle(document.body);
    return {
      backgroundImage: style.backgroundImage,
      backgroundColor: style.backgroundColor,
      backgroundRepeat: style.backgroundRepeat,
      backgroundAttachment: style.backgroundAttachment
    };
  });

  useLayoutEffect(() => {
    const style = {
      backgroundAttachment: "scroll",
      backgroundColor: background,
      backgroundRepeat: "no-repeat",
      backgroundImage: GRADIENT_STYLE_MAP[gradientStyle]({
        color,
        backgroundColor: background
      })
    };

    entries(style).forEach(
      ([key, value]) => (document.body.style[key] = value)
    );

    const cleanup = initial.current;
    return () => {
      entries(cleanup).forEach(
        ([key, value]) => (document.body.style[key] = value)
      );
    };
  }, [color, gradientStyle, background]);
}

export { useBodyBackground };
