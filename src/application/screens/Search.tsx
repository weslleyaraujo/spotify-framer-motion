import React from "react";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { useBodyBackground } from "../../hooks/use-body-background";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";

interface Props {}

function Search(props: Props) {
  useBodyBackground({
    color: "green",
    gradientStyle: "topLeft"
  });

  return (
    <FadePresence>
      <View justify="center" padding={["largest", "large", "none", "large"]}>
        <TextLine text="Search" type="display" color="foregroundPrimary" />
      </View>
    </FadePresence>
  );
}

export { Search, Search as default };
