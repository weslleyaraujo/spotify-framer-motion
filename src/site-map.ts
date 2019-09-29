type Identifier = string;

const ROOT = "/";

/* Search */
const SEARCH = "/search";
const SEARCH_RESULTS = `${SEARCH}/results`;

/* Library */
const LIBRARY = "/library";

/* Settings */
const SETTINGS = "/settings";

interface RouteSearchQuery {}

const HOME = ROOT;
const SITEMAP = {
  ROOT,
  SEARCH,
  SEARCH_RESULTS,
  HOME,
  LIBRARY,
  SETTINGS
};

const MAIN_ROUTES: string[] = [HOME, SEARCH, LIBRARY];

export { SITEMAP, MAIN_ROUTES };
