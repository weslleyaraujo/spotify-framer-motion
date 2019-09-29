import { ApolloProvider } from "@apollo/react-common";
import React from "react";
import { Router } from "react-router-dom";
import { ThemeContext } from "./foundations/Theme";
import { createApolloClient } from "./graphql/create-apollo-client";
import { createBrowserHistory } from "history";
import { theme } from "./theme";

const client = createApolloClient();
const history = createBrowserHistory();

const Providers: React.FunctionComponent = function Providers({ children }) {
  return (
    <ThemeContext.Provider value={theme}>
      <ApolloProvider client={client}>
        <Router history={history}>{children}</Router>
      </ApolloProvider>
    </ThemeContext.Provider>
  );
};

export { Providers };
