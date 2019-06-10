import React from "react";
import { TextLine } from "../components/atoms/TextLine/TextLine";
import { View } from "../components/atoms/View/View";
import { RouteComponentProps } from "@reach/router";
import { useBodyBackground } from "../hooks/useBodyBackground";

interface Props {}

function Search(props: Props & RouteComponentProps) {
  useBodyBackground({
    color: "green",
    gradientStyle: "topLeft"
  });

  return (
    <>
      <View justify="center" padding={["largest", "large", "none", "large"]}>
        <TextLine text="Rock" type="display" color="white" />
      </View>
    </>
  );
}

export { Search };
