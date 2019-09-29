import React, { Suspense } from "react";
import { Route, Switch } from "react-router";

import { Global } from "@emotion/core";
import { Home } from "./screens/Home";
import { LoadingView } from "./components/utilities/LoadingView/LoadingView";
import { Providers } from "./Providers";
import { SITEMAP } from "./site-map";
import { Shell } from "./components/elements/Shell/Shell";
import { globalStyles } from "./global-styles";

const ThemeExplorer = React.lazy(() => import("./screens/ThemeExplorer"));
const Search = React.lazy(() =>
  import(/* webpackChunkName: 'Search' */ "./screens/Search")
);
const Library = React.lazy(() =>
  import(/* webpackChunkName: 'Library' */ "./screens/Library")
);
const Settings = React.lazy(() =>
  import(/* webpackChunkName: 'Settings' */ "./screens/Settings")
);

const fallback = <LoadingView />;

// TODO: Create a loader component to be used as fallback
function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Providers>
        <Suspense fallback={fallback}>
          <Switch>
            <Route path={[SITEMAP.HOME, SITEMAP.SEARCH, SITEMAP.LIBRARY]} exact>
              <Shell>
                <Suspense fallback={fallback}>
                  <Switch>
                    <Route path={SITEMAP.HOME} exact>
                      <Home />
                    </Route>
                    <Route path="/search" exact>
                      <Search />
                    </Route>
                    <Route path="/library" exact>
                      <Library />
                    </Route>
                  </Switch>
                </Suspense>
              </Shell>
            </Route>
            <Route path="/theme-explorer" exact fallback={<div>Loading</div>}>
              <ThemeExplorer />
            </Route>
            <Route path="/settings" exact>
              <Settings />
            </Route>
          </Switch>
        </Suspense>
      </Providers>
    </>
  );
}

export default App;
