/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { motion, useMotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import { TextLine } from "../../../components/atoms/TextLine/TextLine";
import { View } from "../../../components/atoms/View/View";
import { Theme } from "../../../foundations/Theme";
import useDimensions from "react-use-dimensions";

const marquee = keyframes({
  "0%": {
    transform: "translateX(100%)"
  },
  "100%": {
    transform: "translateX(-100%)"
  }
});

function Title({
  title,
  label
}: {
  title: React.ComponentProps<typeof TextLine>["text"];
  label?: React.ComponentProps<typeof TextLine>["text"];
}) {
  const [ref, { width }] = useDimensions({
    liveMeasure: true
  });

  // We are going to change the `ms` of the marquee-like animation based on the
  // size of the text. Bigger text's needs higher animation time
  const textLength = useMemo(() => {
    // Adding 3 extra characters ` · ` concatenation that happens on label
    const addition = 3;
    return String(`${title}${String(label)}`).length + addition;
  }, [title, label]);

  // Only enable the marquee animation if the size of the title is too big for the screen.
  const innerWidth = window.innerWidth;
  const enableMarquee = useMemo(() => width >= innerWidth, [width, innerWidth]);
  const ms = useMemo(() => textLength * 0.43, [textLength]);

  return (
    <div
      ref={ref}
      css={
        enableMarquee && {
          transform: "translateX(100%)",
          animation: `${marquee} ${ms}s linear infinite`
        }
      }
    >
      <TextLine display="inline" numberOfLines={1}>
        {title}
        {label && (
          <TextLine
            text={` · ${label}`}
            display="inline"
            color="foregroundSecondary"
          />
        )}
      </TextLine>
    </div>
  );
}

function StickyPlayer() {
  const theme = useTheme<Theme>();
  const rootRef = useRef(null);
  const opacity = useMotionValue(1);

  return (
    <View
      ref={rootRef}
      padding={["medium", "large"]}
      justify="center"
      style={{
        width: "100%",
        backgroundColor: theme.colors.backgroundAccent,
        borderBottom: "1px solid"
      }}
    >
      <motion.div
        style={{
          display: "inline-block",
          opacity
        }}
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0
        }}
        dragElastic
        onUpdate={latest => {
          const value = Math.abs(
            (Math.abs(Number(latest.x)) * 100) / window.innerWidth
          );
          opacity.set(1 - value / 100);
        }}
      >
        <Title
          title="Get lucky (feat Pharrell) lorem ipsum dollor sit ammet foo"
          label="Daft Punk"
        />
      </motion.div>
    </View>
  );
}

export { StickyPlayer };
