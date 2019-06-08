import React from "react";
import { TextLine } from "../components/atoms/TextLine/TextLine";
import { RouteComponentProps } from "@reach/router";

interface Props {}

function Search(props: Props & RouteComponentProps) {
  return <TextLine text="Search" type="display" />;
}

export { Search };
