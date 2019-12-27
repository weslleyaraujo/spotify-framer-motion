/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll
} from "framer-motion";
import { lighten } from "polished";
import { useEffect, useRef, useState } from "react";
import useDimensions from "react-use-dimensions";
import { Icon } from "../../../components/atoms/Icon/Icon";
import { TextLine } from "../../../components/atoms/TextLine/TextLine";
import { useViewStyles, View } from "../../../components/atoms/View/View";
import { Icons } from "../../../foundations/icons";
import { Layers } from "../../../foundations/Layers";
import { Theme } from "../../../foundations/Theme";
import { useClickOutSide } from "../../../hooks/use-click-outside";

interface Props
  extends Pick<React.HTMLProps<HTMLInputElement>, "placeholder" | "onFocus"> {
  onChange: (value: string) => void;
}

interface DefaultProps extends Required<Pick<Props, "placeholder">> {}

const defaultProps: DefaultProps = {
  placeholder: "Artists, songs, or podcasts"
};

function SearchInput({ placeholder, onFocus, onChange }: Props & DefaultProps) {
  const ref = useRef<HTMLInputElement>(null);
  const theme = useTheme<Theme>();
  const { scrollY } = useViewportScroll();
  const [focus, setFocus] = useState();
  const scrollMotion = useMotionValue(1);
  const [contentRef, { height }] = useDimensions({
    liveMeasure: false
  });

  const content = useViewStyles({
    justify: "center",
    align: "center"
  });

  const { lineHeight, ...font } = theme.fonts.body;

  useClickOutSide(ref, () => {
    setFocus(false);
    if (ref.current && focus) {
      ref.current.blur();
    }
  });

  useEffect(() => {
    const cancel = scrollY.onChange(value => {
      const current = (Math.abs(Number(value)) * 100) / height;
      if (current <= 100) {
        scrollMotion.set(current);
      }
    });

    return cancel;
  });

  const backgroundColor = useTransform(
    scrollMotion,
    [0, 30, 40, 50, 60],
    [
      theme.colors.background,
      lighten(0.005, theme.colors.backgroundAccent),
      lighten(0.01, theme.colors.backgroundAccent),
      lighten(0.02, theme.colors.backgroundAccent),
      lighten(0.06, theme.colors.backgroundAccent)
    ]
  );

  return (
    <motion.div
      ref={contentRef}
      style={{
        position: "sticky",
        top: 0,
        right: 0,
        left: 0,
        zIndex: Layers.Stacks + 100
      }}
    >
      <motion.div
        style={{
          backgroundColor,
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0
        }}
      />
      <motion.div
        animate={{
          opacity: focus ? 0 : 1
        }}
      >
        <View
          align="center"
          justify="center"
          padding={["medium", "none"]}
          style={{
            position: "absolute",
            width: "100%",
            zIndex: Layers.Stacks + 100
          }}
        >
          <TextLine text="Search" display="inline" />
        </View>
      </motion.div>
      <motion.div
        animate={focus ? "active" : "default"}
        initial="default"
        variants={{
          active: {
            width: "100%",
            height: "100%",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0
          },
          default: {
            width: `calc(100% - ${theme.units.small * 2}px)`,
            height: `calc(100% - ${theme.units.small * 2}px)`,
            top: theme.units.small,
            bottom: theme.units.small,
            left: theme.units.small,
            right: theme.units.small,
            borderRadius: theme.units.small
          }
        }}
        css={{
          ...content,
          backgroundColor: theme.colors.backgroundAccent,
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: Layers.Stacks
        }}
      />
      <View justify="center" align="center" padding={["none", "medium"]}>
        <motion.div
          css={{
            position: "relative"
          }}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: focus ? 1 : 0,
            zIndex: Layers.Stacks + 10
          }}
        >
          <View align="center" justify="center">
            <Icon<Icons> type="strokeArrowLeft" size="small" />
          </View>
        </motion.div>
        <input
          ref={ref}
          onClick={e => setFocus(true)}
          onBlur={e => setFocus(false)}
          onChange={({ target: { value } }) => onChange(value)}
          type="text"
          css={{
            ...font,
            caretColor: theme.colors.primary,
            lineHeight: `${lineHeight}px`,
            width: "100%",
            color: !focus ? "transparent" : theme.colors.foregroundPrimary,
            border: "none",
            backgroundColor: "transparent",
            paddingRight: theme.units.small,
            paddingLeft: theme.units.small,
            paddingTop: theme.units.medium,
            paddingBottom: theme.units.medium,
            position: "relative",
            zIndex: Layers.Stacks + 200,
            "&:focus": {
              outline: "transparent"
            }
          }}
        />
        <motion.div
          css={{
            position: "relative",
            zIndex: Layers.Stacks + 200
          }}
          initial={{
            scale: 1
          }}
          animate={{
            scale: focus ? 1 : 0.85
          }}
        >
          <View align="center" justify="center">
            <Icon<Icons> type="libraryFill" size="small" />
          </View>
        </motion.div>
      </View>
    </motion.div>
  );
}

SearchInput.defaultProps = defaultProps;

export { SearchInput };
