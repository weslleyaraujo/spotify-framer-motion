/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { Picture } from "../../components/atoms/Picture/Picture";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { Button } from "../../components/molecules/Button/Button";
import { AnimatedMinimize } from "../../components/utilities/AnimatedMinimize/AnimatedMinimize";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { Theme } from "../../foundations/Theme";
import { useBodyBackground } from "../../hooks/use-body-background";

function Artist() {
  useBodyBackground({
    color: "green",
    gradientStyle: "topBottom"
  });

  const theme = useTheme<Theme>();

  const dimensions = 150;

  return (
    <FadePresence>
      <AnimatedMinimize
        content={
          <View padding={["none", "none", "largest", "none"]}>
            <View
              padding={["larger", "large", "medium"]}
              justify="center"
              align="center"
            >
              <div
                style={{
                  width: dimensions,
                  height: dimensions,
                  overflow: "hidden",
                  borderRadius: "4000px"
                }}
              >
                <Picture
                  alt="Tame Impala"
                  source=""
                  aspectRatio="square"
                  width={dimensions}
                  height={dimensions}
                />
              </div>
            </View>
            <View justify="center" direction="column" align="center">
              <TextLine text="Tame Impala" type="heading" />
              <View margin={["medium", "none"]}>
                <TextLine
                  text="8,112,592 MONTHLY LISTENERS"
                  type="caption"
                  color="foregroundSecondary"
                />
              </View>
            </View>
          </View>
        }
      >
        <View justify="center" direction="column" align="center">
          <div
            css={{
              position: "relative",
              top: `-${theme.units.larger}px`
            }}
          >
            <Button
              type="primary"
              label="Shuffle Play"
              display="inline"
              size="large"
            />
          </div>
          <View align="center">
            <TextLine text="Popular" />
          </View>
        </View>

        {[...new Array(12)].map((item, key) => (
          <View
            key={key}
            padding={["small", "medium"]}
            justify="space-between"
            align="center"
          >
            <View>
              <Picture
                width={60}
                height={60}
                alt="Music"
                source=""
                aspectRatio="square"
              />
            </View>
            <View flex={1} padding={["small", "medium"]}>
              <TextLine text="Currents" />
              <TextLine text="2015 - Album" color="foregroundSecondary" />
            </View>
          </View>
        ))}
      </AnimatedMinimize>
    </FadePresence>
  );
}

export { Artist, Artist as default };
