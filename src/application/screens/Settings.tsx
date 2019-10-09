import React from "react";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { useBodyBackground } from "../../hooks/use-body-background";

interface Props {}

function Settings(props: Props) {
  useBodyBackground({
    color: "purple",
    gradientStyle: "topLeft"
  });
  console.log("hello world");
  return (
    <>
      <View justify="center" padding={["largest", "large", "none", "large"]}>
        <TextLine text="Settings" type="display" color="foregroundPrimary" />
      </View>
    </>
  );
}

export { Settings, Settings as default };
