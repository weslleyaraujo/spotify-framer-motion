import React from "react";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { useBodyBackground } from "../../hooks/use-body-background";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";

interface LibraryProps {}

function Library(props: LibraryProps) {
  useBodyBackground({
    color: "red",
    gradientStyle: "topLeft"
  });

  return (
    <FadePresence>
      <View justify="center" padding={["largest", "large", "none", "large"]}>
        <TextLine text="Library" type="display" color="foregroundPrimary" />
      </View>
    </FadePresence>
  );
}

export { Library, Library as default };
