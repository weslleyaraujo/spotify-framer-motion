type Identifier = string;

const ROOT = "/";

/* Search */
const SEARCH = "/search";
const SEARCH_RESULTS = `${SEARCH}/results`;

interface RouteSearchQuery {}

const MAIN_ROUTES: string[] = [];
const HOME = ROOT;
const SITEMAP = {
  ROOT,
  SEARCH,
  SEARCH_RESULTS,
  HOME
};

export { SITEMAP, MAIN_ROUTES };
