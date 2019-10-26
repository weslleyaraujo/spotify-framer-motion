/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  motion,
  useViewportScroll,
  useMotionValue,
  useTransform
} from "framer-motion";
import useDimensions from "react-use-dimensions";
import { useEffect, useRef } from "react";
import { Layers } from "../../../foundations/Layers";
import { useTheme } from "emotion-theming";
import { Theme } from "../../../foundations/Theme";

// TODO: add option to opt-out scaling
// TODO: if scale is active children wrapper should have backgroundColor and "content" should have a gradient from bottom up
const AnimatedMinimize: React.FC<{
  content: React.ReactNode;
}> = function AnimatedMinimize({ children, content }) {
  const theme = useTheme<Theme>();
  const { scrollY } = useViewportScroll();
  const [contentRef, { height }] = useDimensions();
  // We need to store a "paintHeight" here since later we going to start
  // messing up with the element transform: scale property which affects dimensions
  const paintHeight = useRef<number | null>(null);
  const scrollMotion = useMotionValue(1);
  const opacity = useTransform(scrollMotion, y => {
    const value = 1 - y / 100;
    if (value >= 0.4) {
      return value;
    }

    console.log(value);
    return value <= 0.1 ? 0 : value;
  });

  const scale = useTransform(scrollMotion, y => {
    const value = 1 - y / 100;
    if (value >= 0.4) {
      return 1;
    }

    return value + 0.6 <= 0.17 ? 0.17 : value + 0.4;
  });

  if (height && !paintHeight.current) {
    paintHeight.current = height;
  }
  console.log(scrollMotion.get(), paintHeight.current);

  useEffect(() => {
    const cancel = scrollY.onChange(value => {
      if (paintHeight.current) {
        const current = (Math.abs(Number(value)) * 100) / paintHeight.current;
        scrollMotion.set((100 * current) / paintHeight.current);
      }
    });

    return cancel;
  }, [scrollY, scrollMotion, height]);

  return (
    <div
      css={{
        position: "relative"
      }}
    >
      <motion.div
        ref={contentRef}
        style={{
          opacity,
          scale
        }}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        css={{
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: Layers.Root
        }}
      >
        {content}
      </motion.div>
      <motion.div
        style={{
          marginTop: height,
          zIndex: Layers.Root + 10,
          position: "relative",
          backgroundColor: theme.colors.background
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export { AnimatedMinimize };
