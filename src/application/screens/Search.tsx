import React from "react";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { useBodyBackground } from "../../hooks/useBodyBackground";

interface Props {}

function Search(props: Props) {
  useBodyBackground({
    color: "green",
    gradientStyle: "topLeft"
  });

  return (
    <>
      <View justify="center" padding={["largest", "large", "none", "large"]}>
        <TextLine text="Search" type="display" color="foregroundPrimary" />
      </View>
    </>
  );
}

export { Search, Search as default };
