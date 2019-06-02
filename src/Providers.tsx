import React from "react";
import { createApolloClient } from "./graphql/create-apollo-client";
import { ApolloProvider } from "react-apollo";
import { ThemeContext } from "./foundations/Theme";
import { theme } from "./theme";
import { Router } from "@reach/router";

const client = createApolloClient();

const Providers: React.FunctionComponent = function Providers({ children }) {
  return (
    <ThemeContext.Provider value={theme}>
      <ApolloProvider client={client}>
        <Router>{children}</Router>
      </ApolloProvider>
    </ThemeContext.Provider>
  );
};

export { Providers };
