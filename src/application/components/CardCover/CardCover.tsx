import { Action } from "../../../components/atoms/Action/Action";
import { CardProps } from "../../../interfaces/Card";
import { Picture } from "../../../components/atoms/Picture/Picture";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { TextLine } from "../../../components/atoms/TextLine/TextLine";
import { View } from "../../../components/atoms/View/View";

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
      <View margin={["small", "none"]}>
        <TextLine
          text={props.title}
          color="foregroundPrimary"
          type="title"
          numberOfLines={1}
        />
      </View>
    </Action>
  );
}

export { CardCover };
