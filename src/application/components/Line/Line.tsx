/**  @jsx jsx */
import { jsx } from "@emotion/core";
import { Action } from "../../../components/atoms/Action/Action";
import { View } from "../../../components/atoms/View/View";
import { Interaction } from "../../../interfaces/Card";

interface LineProps<T extends Object> {
  interaction: Interaction<T>;
  head?: React.ReactNode;
  children?: React.ReactNode;
  tail?: React.ReactNode;
}

function Line<P extends Object>({
  interaction,
  head,
  children,
  tail
}: LineProps<P>) {
  return (
    <Action {...interaction.action}>
      <View
        padding={["small", "medium"]}
        justify="space-between"
        align="center"
        supportsTruncation
      >
        <View supportsTruncation>{head || null}</View>
        <View flex={1} padding={["small", "medium"]} supportsTruncation>
          {children || null}
        </View>
        <View supportsTruncation>{tail || null}</View>
      </View>
    </Action>
  );
}

export { Line };
