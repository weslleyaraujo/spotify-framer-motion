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

interface ScaleOutProps {
  content: React.ReactNode;
  children: React.ReactNode;
  disableScaling?: boolean;
  disableBackground?: boolean;
  scale?: {
    from: Parameters<typeof useTransform>[1];
    to: Parameters<typeof useTransform>[1];
  };
}

interface ScaleOutDefaultProps
  extends Required<
    Pick<ScaleOutProps, "disableBackground" | "disableScaling" | "scale">
  > {}

const defaultProps: ScaleOutDefaultProps = {
  disableBackground: false,
  disableScaling: false,
  scale: {
    from: [1, 0.9, 0.88, 0.84, 0.82, 0.8],
    to: [1, 0.98, 0.96, 0.94, 0.92, 0.9]
  }
};

function ScaleOut({
  children,
  content,
  disableBackground,
  disableScaling,
  scale: scaleTransform
}: ScaleOutProps & ScaleOutDefaultProps) {
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

  const scale = useTransform(value, scaleTransform.from, scaleTransform.to);

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
              height: paintHeight.current / 1.9,
              top: `-${paintHeight.current / 1.9}px`
            }),
            ...(!disableBackground && {
              backgroundImage: `linear-gradient(transparent 0%, ${theme.colors.background} 80%)`
            })
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

ScaleOut.defaultProps = defaultProps;

export { ScaleOut };
