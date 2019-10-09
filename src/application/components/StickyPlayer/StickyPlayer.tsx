/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { TextLine } from "../../../components/atoms/TextLine/TextLine";
import { View } from "../../../components/atoms/View/View";
import { Theme } from "../../../foundations/Theme";
import { motion, useMotionValue } from "framer-motion";
import { useRef, useEffect, useMemo } from "react";

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
  const ms = useMemo(() => String(String(label) + title).length * 0.43, [
    label,
    title
  ]);

  console.log(ms);

  return (
    <div
      css={{
        transform: "translateX(100%)",
        animation: `${marquee} ${ms}s linear infinite`
      }}
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
  return (
    <View
      ref={rootRef}
      padding={["medium", "large"]}
      style={{
        width: "100%",
        backgroundColor: theme.colors.backgroundAccent,
        borderBottom: "1px solid"
      }}
    >
      <motion.div
        drag="x"
        dragConstraints={rootRef}
        dragElastic
        onDrag={(event, info) => {
          console.log({ info });
        }}
      >
        <Title
          title="Get lucky (feat Pharrell Williams & Nile Rodgers) Radio Edit"
          label="Daft Punk"
        />
      </motion.div>
    </View>
  );
}

export { StickyPlayer };
