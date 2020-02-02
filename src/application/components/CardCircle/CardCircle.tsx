import { Action } from "../../../components/atoms/Action/Action";
import { CardProps } from "../../../interfaces/Card";
import { Picture } from "../../../components/atoms/Picture/Picture";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { TextLine } from "../../../components/atoms/TextLine/TextLine";
import { View } from "../../../components/atoms/View/View";
import { Ring } from "../Ring/Ring";

interface CardCircleProps<P extends Object>
  extends CardProps<{
    required: "interactions" | "media" | "title";
    actions: {
      primary: P;
    };
    interactions: "primary";
  }> {}

function CardCircle<P>(props: CardCircleProps<P>) {
  return (
    <Action {...props.interactions.primary.action}>
      <Ring>
        <Picture {...props.media} alt={props.title} aspectRatio="square" />
      </Ring>
      <View margin={["small", "none"]}>
        <TextLine
          numberOfLines={1}
          text={props.title}
          color="foregroundPrimary"
          type="title"
          textAlign="center"
        />
      </View>
    </Action>
  );
}

export { CardCircle };
