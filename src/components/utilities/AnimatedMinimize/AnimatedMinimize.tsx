/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll
} from "framer-motion";
import { useEffect, useRef } from "react";
import useDimensions from "react-use-dimensions";
import { Layers } from "../../../foundations/Layers";
import { Theme } from "../../../foundations/Theme";

// TODO: add option to opt-out scaling
// TODO: if scale is active children wrapper should have backgroundColor and "content" should have a gradient from bottom up
const AnimatedMinimize: React.FC<{
  content: React.ReactNode;
}> = function AnimatedMinimize({ children, content }) {
  const theme = useTheme<Theme>();
  const { scrollY } = useViewportScroll();
  const [contentRef, { height }] = useDimensions({
    liveMeasure: false
  });
  // We need to store a "paintHeight" here since later we going to start
  // messing up with the element transform: scale property which affects dimensions
  const paintHeight = useRef<number | null>(null);
  const scrollMotion = useMotionValue(1);
  const value = useTransform(scrollMotion, y => 1 - y / 100);
  const opacity = useTransform(
    value,
    [1, 0.8, 0.75, 0.65, 0.5],
    [1, 0.75, 0.65, 0.5, 0]
  );
  const scale = useTransform(
    value,
    [1, 0.9, 0.88, 0.84, 0.82, 0.8],
    [1, 0.98, 0.96, 0.94, 0.92, 0.9]
  );

  if (height && !paintHeight.current) {
    paintHeight.current = height;
  }

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
        css={{
          ...(paintHeight.current && {
            marginTop: paintHeight.current + paintHeight.current / 2.5
          }),
          zIndex: Layers.Root + 10,
          position: "relative",
          backgroundColor: theme.colors.background,
          "&:before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            // backgroundImage: `linear-gradient(to top, ${theme.colors.background} 20%, ${theme.colors.background} 0.5%, transparent)`,
            backgroundImage: `linear-gradient(to top, ${theme.colors.background} 0px, transparent 100%)`,
            ...(paintHeight.current && {
              height: paintHeight.current / 2.5,
              top: `-${paintHeight.current / 2.5}px`
            })
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export { AnimatedMinimize };
