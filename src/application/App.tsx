import React, { Suspense, Fragment } from "react";
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
const SearchResults = React.lazy(() =>
  import(/* webpackChunkName: 'SearchResults' */ "./screens/SearchResults")
);
const Library = React.lazy(() =>
  import(/* webpackChunkName: 'Library' */ "./screens/Library")
);
const Settings = React.lazy(() =>
  import(/* webpackChunkName: 'Settings' */ "./screens/Settings")
);

const Artist = React.lazy(() =>
  import(/* webpackChunkName: 'Artist' */ "./screens/Artist")
);

const Album = React.lazy(() =>
  import(/* webpackChunkName: 'Album' */ "./screens/Album")
);

const Genre = React.lazy(() =>
  import(/* webpackChunkName: 'Artist' */ "./screens/Genre")
);

const fallback = <LoadingView />;

function App() {
  return (
    <Fragment>
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
                    <Route path={SITEMAP.SEARCH} exact>
                      <Search />
                    </Route>
                    <Route path={SITEMAP.LIBRARY} exact>
                      <Library />
                    </Route>
                  </Switch>
                </Suspense>
              </Shell>
            </Route>
            <Route path={SITEMAP.SEARCH_RESULTS}>
              <SearchResults />
            </Route>
            <Route path={SITEMAP.ARTIST} component={Artist} />
            <Route path={SITEMAP.ALBUM} component={Album} />
            <Route path={SITEMAP.GENRE} component={Genre} />
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
    </Fragment>
  );
}

export default App;
