import React from "react";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { useBodyBackground } from "../../hooks/useBodyBackground";

interface Props {}

function Library(props: Props) {
  useBodyBackground({
    color: "red",
    gradientStyle: "topLeft"
  });

  return (
    <View justify="center" padding={["largest", "large", "none", "large"]}>
      <TextLine text="Library" type="display" color="foregroundPrimary" />
    </View>
  );
}

export { Library, Library as default };
