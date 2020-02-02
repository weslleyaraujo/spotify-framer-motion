/**  @jsx jsx */
import { jsx } from "@emotion/core";
import { Action } from "../../../components/atoms/Action/Action";
import { View } from "../../../components/atoms/View/View";
import { Interaction } from "../../../interfaces/Card";

interface LineProps<T extends Object> {
  interaction: Interaction<T>;
  head?: React.ReactNode;
  body?: React.ReactNode;
  tail?: React.ReactNode;
}

function Line<P extends Object>({
  interaction,
  head,
  body,
  tail
}: LineProps<P>) {
  return (
    <Action {...interaction.action}>
      <View
        padding={["small", "medium"]}
        justify="space-between"
        align="center"
      >
        <View>{head || null}</View>
        <View flex={1} padding={["small", "medium"]}>
          {body || null}
        </View>
        <View>{tail || null}</View>
      </View>
    </Action>
  );
}

export { Line };
