/** @jsx jsx */
import { jsx } from "@emotion/core";
import { View } from "../../atoms/View/View";
import { TextLine } from "../../atoms/TextLine/TextLine";
import { Colors } from "../../../foundations/Theme";
import { Action } from "../../../interfaces/Action";
import { Icon } from "../../atoms/Icon/Icon";
import { IconTypes } from "../../../foundations/icons";

interface ItemProps<T> {
  text: NonNullable<React.ComponentProps<typeof TextLine>["text"]>;
  icon: IconTypes;
  color?: keyof Colors;
  action: Action<T>;
  active?: boolean;
}

interface ItemDefaultProps<T>
  extends Required<Pick<ItemProps<T>, "color" | "action" | "active">> {}

function Item<T>({
  text,
  icon,
  color,
  action,
  active
}: ItemProps<T> & ItemDefaultProps<T>) {
  const { as: HTMLElement, ...actionProps } = action;
  const selectedColor: keyof Colors = active ? "primary" : color;
  return (
    <div
      css={{
        flexGrow: 1,
        flexBasis: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        appearance: "none"
      }}
    >
      <HTMLElement {...actionProps}>
        <View
          direction="column"
          align="center"
          padding={["large", "medium", "medium", "medium"]}
          supportsTruncation
        >
          {icon && <Icon<IconTypes> type={icon} color={selectedColor} />}
          <View margin={["small", "none", "none", "none"]}>
            <TextLine
              type="caption"
              text={text}
              color={selectedColor}
              numberOfLines={1}
            />
          </View>
        </View>
      </HTMLElement>
    </div>
  );
}

interface Props<T> {
  items: ItemProps<T> & ItemDefaultProps<T>[];
}

function Navigation<T>({ items }: Props<T>) {
  return (
    <div
      css={{
        width: "100%"
      }}
    >
      <View justify="space-around" direction="row">
        {items.map((item, index) => (
          <Item<T> key={`navigation-item-${index}`} {...item} />
        ))}
      </View>
    </div>
  );
}

export { Navigation };
