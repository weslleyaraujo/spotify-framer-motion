import { Action } from "../../atoms/Action/Action";
import { CardProps } from "../../../interfaces/Card";
import { Picture } from "../../atoms/Picture/Picture";
/** @jsx jsx */
import { jsx } from "@emotion/core";

interface Props<P extends Object>
  extends CardProps<{
    required: "interactions" | "media" | "title";
    actions: {
      primary: P;
    };
    interactions: "primary";
  }> {}

function CardCover<P>(props: Props<P>) {
  return (
    <Action {...props.interactions.primary.action}>
      <Picture {...props.media} alt={props.title} aspectRatio="square" />
    </Action>
  );
}

export { CardCover };
