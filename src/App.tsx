import React, { Suspense } from "react";
import { Route, Switch } from "react-router";

import { Global } from "@emotion/core";
import { Home } from "./screens/Home";
import { Providers } from "./Providers";
import { SITEMAP } from "./site-map";
import { Shell } from "./components/elements/Shell/Shell";
import { globalStyles } from "./global-styles";

const ThemeExplorer = React.lazy(() => import("./screens/ThemeExplorer"));
const Search = React.lazy(() => import("./screens/Search"));
const Library = React.lazy(() => import("./screens/Library"));

// TODO: Create a loader component to be used as fallback
function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Providers>
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Shell>
              <Route path={SITEMAP.HOME} exact>
                <Home />
              </Route>
              <Route path="/search" exact>
                <Search />
              </Route>
              <Route path="/library" exact>
                <Library />
              </Route>
            </Shell>
            <Route path="/theme-explorer" exact fallback={<div>Loading</div>}>
              <ThemeExplorer />
            </Route>
          </Switch>
        </Suspense>
      </Providers>
    </>
  );
}

export default App;
