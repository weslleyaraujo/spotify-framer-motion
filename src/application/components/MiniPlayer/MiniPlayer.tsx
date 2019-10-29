/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { createContext, useContext, useMemo } from "react";
import useDimensions from "react-use-dimensions";
import { TextLine } from "../../../components/atoms/TextLine/TextLine";
import { View } from "../../../components/atoms/View/View";
import { Theme } from "../../../foundations/Theme";
import { Marquee } from "../../../components/utilities/Marquee/Marquee";
import { SongDisplay } from "../SongDisplay/SongDisplay";
import { Icon } from "../../../components/atoms/Icon/Icon";
import { Icons } from "../../../foundations/icons";

interface ContextInterface {
  title: React.ComponentProps<typeof TextLine>["text"];
  label?: React.ComponentProps<typeof TextLine>["text"];
}

const Context = createContext<ContextInterface>({
  title: "",
  label: ""
});

function Title() {
  const { title, label } = useContext(Context);
  // We are going to change the `ms` of the marquee-like animation based on the
  // size of the text. Bigger text's needs higher animation time
  const textLength = useMemo(() => {
    // Adding 3 extra characters ` · ` concatenation that happens on label
    const addition = 3;
    return String(`${title}${String(label)}`).length + addition;
  }, [title, label]);

  const [container, { width }] = useDimensions({
    liveMeasure: true
  });

  const condition = !width ? false : width >= window.innerWidth;
  const node = (
    <TextLine numberOfLines={1} as="p" ref={container} textAlign="center">
      {title}
      {label && (
        <TextLine as="span" text={` · ${label}`} color="foregroundSecondary" />
      )}
    </TextLine>
  );

  if (!condition) {
    return node;
  }

  return <Marquee length={textLength}>{node}</Marquee>;
}

function MiniPlayer() {
  const theme = useTheme<Theme>();
  return (
    <Context.Provider
      value={{
        title: "Comedown",
        label: "Parcels"
      }}
    >
      <View
        padding="medium"
        justify="space-between"
        align="center"
        style={{
          width: "100%",
          backgroundColor: theme.colors.backgroundAccent,
          borderBottom: "1px solid"
        }}
      >
        <View
          justify="center"
          align="center"
          style={{
            width: theme.scales.small,
            height: theme.scales.small
          }}
        >
          <Icon<Icons> type="strokeArrowUp" size="small" />
        </View>

        <View
          flex={1}
          style={{
            whiteSpace: "nowrap",
            width: 327 // TODO
          }}
        >
          <SongDisplay itemsHeight={Number(theme.fonts.featured.lineHeight)}>
            <Title />
            <Title />
            <Title />
          </SongDisplay>
        </View>
        <View
          justify="center"
          align="center"
          style={{
            width: theme.scales.small,
            height: theme.scales.small
          }}
        >
          <Icon<Icons> type="strokePlay" size="small" />
        </View>
      </View>
    </Context.Provider>
  );
}

export { MiniPlayer };
