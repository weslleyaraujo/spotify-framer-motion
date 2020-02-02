/** @jsx jsx */

import { ActionProps } from "../../../interfaces/Card";
import { Assign } from "utility-types";
import { Icon } from "../../atoms/Icon/Icon";
import { Icons } from "../../../foundations/icons";
import { TextLine } from "../../atoms/TextLine/TextLine";
import { Theme } from "../../../foundations/Theme";
import { View } from "../../atoms/View/View";
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";

interface ItemProps<T> {
  text: NonNullable<React.ComponentProps<typeof TextLine>["text"]>;
  icon: Icons;
  color?: React.ComponentProps<typeof TextLine>["color"];
  action: ActionProps<T>;
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
  const { as: ActionElement, ...actionProps } = action;
  const selectedColor: typeof color = active ? color : "foregroundSecondary";

  return (
    <ActionElement
      {...actionProps}
      css={{
        flex: 1,
        flexGrow: 1,
        flexBasis: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        appearance: "none"
      }}
    >
      <View
        direction="column"
        align="center"
        padding={["small", "small", "small", "small"]}
        supportsTruncation
      >
        {icon && <Icon<Icons> type={icon} color={selectedColor} size="small" />}
        <View margin={["small", "none", "none", "none"]}>
          <TextLine
            type="caption"
            text={text}
            color={selectedColor}
            numberOfLines={1}
          />
        </View>
      </View>
    </ActionElement>
  );
}

const defaultItemsProps: ItemDefaultProps<{}> = {
  action: {
    as: "div"
  },
  active: false,
  color: "foregroundPrimary"
};

Item.defaultProps = defaultItemsProps;

interface NavigationProps<T> {
  items: Assign<ItemProps<T>, ItemDefaultProps<T>>[];
}

function Navigation<T>({ items }: NavigationProps<T>) {
  const theme = useTheme<Theme>();
  return (
    <div
      css={{
        width: "100%",
        backgroundColor: theme.colors.backgroundAccent,
        display: "flex",
        justifyContent: "center"
      }}
    >
      <View
        justify="space-around"
        direction="row"
        style={{
          width: "80%"
        }}
      >
        {items.map((item, index) => (
          <Item<T> key={`navigation-item-${index}`} {...item} />
        ))}
      </View>
    </div>
  );
}

export { Navigation };
