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

interface Props {
  content: React.ReactNode;
  children: React.ReactNode;
  disableScaling?: boolean;
  disableBackground?: boolean;
}

interface DefaultProps
  extends Required<Pick<Props, "disableBackground" | "disableScaling">> {}

const defaultProps: DefaultProps = {
  disableBackground: false,
  disableScaling: false
};

function AnimatedMinimize({
  children,
  content,
  disableBackground,
  disableScaling
}: Props & DefaultProps) {
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
          ...(!disableScaling && {
            scale
          })
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
          ...(paintHeight.current &&
            !disableScaling && {
              marginTop: paintHeight.current + paintHeight.current / 2.5
            }),
          ...(paintHeight.current && {
            marginTop: paintHeight.current
          }),
          ...(!disableBackground && {
            backgroundColor: theme.colors.background
          }),
          zIndex: Layers.Root + 10,
          position: "relative",
          "&:before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            ...(paintHeight.current && {
              height: paintHeight.current / 2.5,
              top: `-${paintHeight.current / 2.5}px`
            }),
            ...(!disableBackground && {
              backgroundImage: `linear-gradient(to top, ${theme.colors.background} 0px, transparent 100%)`
            })
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

AnimatedMinimize.defaultProps = defaultProps;

export { AnimatedMinimize };
