import React from "react";
import { createApolloClient } from "./graphql/create-apollo-client";
import { ApolloProvider } from "react-apollo";
import { ThemeContext } from "./foundations/Theme";
import { theme } from "./theme";

const client = createApolloClient();

const Providers: React.FunctionComponent = function Providers({ children }) {
  return (
    <ThemeContext.Provider value={theme}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ThemeContext.Provider>
  );
};

export { Providers };
