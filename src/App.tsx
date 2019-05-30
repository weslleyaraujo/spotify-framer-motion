import React from "react";
import { Global } from "@emotion/core";
import { Text } from "./components/atoms/Text/Text";
import { View } from "./components/atoms/View/View";
import { Button } from "./components/molecules/Button/Button";
import { useTheme } from "./foundations/useTheme";
import { Icon } from "./components/atoms/Icon/Icon";
import { globalStyles } from "./global-styles";
import { IconTypes } from "./foundations/icons";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { gql } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { useQuery } from "@apollo/react-hooks";

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache
});

function App() {
  const theme = useTheme();
  const { data } = useQuery(gql`
    query QueryGetUser {
      user {
        id
      }
    }
  `);

  console.log({ data });
  return (
    <ApolloProvider client={client}>
      <Global styles={globalStyles} />
      <View
        padding="large"
        style={{ backgroundColor: theme.colors.complementary }}
      >
        <Text type="display" text="Example" color="white" />
      </View>
      <View padding="large" justify="center">
        <>
          <Text type="heading" text="learn anything" as="p" />
          <View>
            <Icon<IconTypes> size="smallest" type="pencil" />
          </View>
        </>
      </View>
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
      <View margin="large">
        <Button label="Small" size="small" />
      </View>
      <View margin="large">
        <Button label="Medium" size="medium" />
      </View>
      <View margin="large">
        <Button label="Large" size="large" />
      </View>
    </ApolloProvider>
  );
}

export default App;
