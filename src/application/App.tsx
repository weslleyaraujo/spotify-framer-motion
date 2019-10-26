import React, { Suspense } from "react";
import { Route, Switch } from "react-router";

import { Global } from "@emotion/core";
import { Home } from "./screens/Home";
import { LoadingView } from "../components/utilities/LoadingView/LoadingView";
import { Providers } from "./Providers";
import { SITEMAP } from "./site-map";
import { Shell } from "./components/Shell/Shell";
import { globalStyles } from "./global-styles";

const Development = React.lazy(() =>
  import(/* webpackChunkName: 'Development' */ "./screens/Development")
);
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

function App() {
  return (
    <>
      <Providers>
        <Global styles={globalStyles} />
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
            {process.env.NODE_ENV === "development" && (
              <Route path={SITEMAP.DEVELOPMENT} exact fallback={fallback}>
                <Development />
              </Route>
            )}
            <Route path={SITEMAP.SETTINGS} exact>
              <Settings />
            </Route>
          </Switch>
        </Suspense>
      </Providers>
    </>
  );
}

export default App;
