import { ApolloProvider } from "@apollo/react-common";
import React from "react";
import { Router } from "react-router-dom";
import { ThemeProvider } from "emotion-theming";
import { createApolloClient } from "../graphql/create-apollo-client";
import { createHashHistory } from "history";
import { theme } from "./application-theme";

const client = createApolloClient();
const history = createHashHistory();

const Providers: React.FunctionComponent = function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router history={history}>{children}</Router>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export { Providers };
