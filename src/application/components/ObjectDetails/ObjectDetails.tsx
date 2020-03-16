import { transparentize } from "polished";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { useViewStyles, View } from "../../../components/atoms/View/View";
import { FadePresence } from "../../../components/utilities/FadePresence/FadePresence";
import { ScaleOut } from "../../../components/utilities/ScaleOut/ScaleOut";
import { Layers } from "../../../foundations/Layers";
import { theme } from "../../application-theme";

interface Props {
  head?: React.ReactNode;
  overlap?: React.ReactNode;
  children: React.ReactNode;
  backgroundImage: string;
}

function ObjectDetails({ backgroundImage, head, children, overlap }: Props) {
  const headerStyles = useViewStyles({
    padding: "none",
    margin: "none",
    justify: "center",
    align: "flex-end"
  });

  return (
    <FadePresence>
      <ScaleOut
        scale={{
          from: [1, 0.8],
          to: [1.06, 1.01]
        }}
        content={
          <div
            css={{
              ...headerStyles,
              label: "background",
              paddingBottom: theme.units.larger,
              height: theme.scales.larger * 2.3,
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: "top center",
              backgroundSize: "100vw",
              backgroundRepeat: "no-repeat",
              "&:after": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: transparentize(0.7, theme.colors.background),
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: Layers.Root
              }
            }}
          >
            <View
              justify="center"
              direction="column"
              align="center"
              supportsTruncation
              style={{
                width: "76vw",
                position: "relative",
                zIndex: Layers.Root + 10
              }}
            >
              {head}
            </View>
          </div>
        }
      >
        {overlap && (
          <div
            css={{
              position: "relative",
              top: `-${theme.units.larger * 1.5}px`
            }}
          >
            <View justify="center" direction="column" align="center">
              {overlap}
            </View>
          </div>
        )}
        <div
          css={{
            position: "relative",
            top: `-${theme.units.larger * 1}px`
          }}
        >
          {children}
        </div>
      </ScaleOut>
    </FadePresence>
  );
}

export { ObjectDetails };
