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

/* Artist */
const ARTIST = "/artist/:id";

export interface RouteArtistParameters {
  id: string;
}

/* Album */
const ALBUM = "/album/:id";

export interface RouteAlbumParameters {
  id: string;
}

/* Genre */
const GENRE = "/genre/:id";

export interface RouteGenreParameters {
  id: string;
}

/* Playlist */
const PLAYLIST = "/playlist/:id";

export interface RoutePlaylistParameters {
  id: string;
}

/* Development */
const DEVELOPMENT = "/development";

const HOME = ROOT;
const SITEMAP = {
  ROOT,
  SEARCH,
  SEARCH_RESULTS,
  ARTIST,
  ALBUM,
  GENRE,
  PLAYLIST,
  HOME,
  LIBRARY,
  SETTINGS,
  DEVELOPMENT
};

const MAIN_ROUTES: string[] = [HOME, SEARCH, LIBRARY];

export { SITEMAP, MAIN_ROUTES };
