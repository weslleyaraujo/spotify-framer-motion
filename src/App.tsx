/** @jsx jsx */
import React from "react";
import { jsx, Global } from "@emotion/core";
import { Text } from "./components/atoms/Text/Text";
import { View } from "./components/atoms/View/View";
import { useTheme } from "./foundations/useTheme";
import { Icon } from "./components/atoms/Icon/Icon";
import { globalStyles } from "./global-styles";
import { IconTypes } from "./foundations/icons";

function App() {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      <Icon<IconTypes> size="smallest" type="pencil" />
      <Icon<IconTypes> size="small" type="pencil" />
      <Icon<IconTypes> type="pencil" />
      <Icon<IconTypes> size="large" type="pencil" />
      <Icon<IconTypes> size="largest" type="pencil" color="secondary" />
      <Text
        as="h1"
        type="display"
        text="display - Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="heading"
        text="heading - Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="title"
        text="title- Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="subtitle"
        text="subtitle - Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="featured"
        text="featured - Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="body"
        text="body - Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="strong"
        text="strong - Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <View
        margin={["large", "none"]}
        padding="large"
        justify="center"
        style={{ backgroundColor: theme.colors.complementary }}
        radius="small"
      >
        <Text
          as="p"
          type="title"
          text="This is a View"
          color="white"
          numberOfLines={2}
        />
      </View>
    </React.Fragment>
  );
}

export default App;
