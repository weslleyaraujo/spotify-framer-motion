import React, { SuspenseProps } from "react";
import { Global } from "@emotion/core";
import { globalStyles } from "./global-styles";
import { Providers } from "./Providers";
import { Home } from "./screens/Home";
import { RouteComponentProps } from "@reach/router";

const ThemeExplorer = React.lazy(() => import("./screens/ThemeExplorer"));
const Search = React.lazy(() => import("./screens/Search"));

const Suspense = React.Suspense as React.ExoticComponent<
  SuspenseProps & RouteComponentProps
>;

// TODO: Create a loader component to be used as fallback
function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Providers>
        <Home path="/" />
        <Suspense path="/search" fallback={<div>loading</div>}>
          <Search default />
        </Suspense>
        <Suspense path="/theme-explorer" fallback={<div>loading</div>}>
          <ThemeExplorer default />
        </Suspense>
      </Providers>
    </>
  );
}

export default App;
