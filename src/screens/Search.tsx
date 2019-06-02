import React from "react";
import { Text } from "../components/atoms/Text/Text";
import { RouteComponentProps } from "@reach/router";

interface Props {}

function Search(props: Props & RouteComponentProps) {
  return <Text text="Search" type="display" />;
}

export { Search };
