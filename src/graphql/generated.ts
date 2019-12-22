import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
}

export interface GQLAlbum {
   __typename: 'Album',
  id: Scalars['ID'],
  name: Scalars['String'],
  artist: Scalars['ID'],
  songs: Array<Scalars['ID']>,
  cover: Scalars['String'],
}

export interface GQLArtist {
   __typename: 'Artist',
  id: Scalars['ID'],
  name: Scalars['String'],
  listeners: Scalars['Int'],
  cover: Scalars['String'],
  popular: Array<GQLSong>,
}

export interface GQLFeed {
   __typename: 'Feed',
  id: Scalars['ID'],
  sections: Array<GQLSection>,
}

/** 
 * ==
 * Application interfaces
 * ==
 */
export interface GQLNode {
   __typename: 'Node',
  id: Scalars['ID'],
}

export interface GQLQuery {
   __typename: 'Query',
  /** user: User! */
  feed: GQLFeed,
  artist: GQLArtist,
  search: Array<GQLSearchResult>,
  album: GQLAlbum,
}


export interface GQLQueryArtistArgs {
  id: Scalars['ID']
}


export interface GQLQuerySearchArgs {
  term: Scalars['String']
}


export interface GQLQueryAlbumArgs {
  id: Scalars['ID']
}

export interface GQLSearchResult {
   __typename: 'SearchResult',
  name: Scalars['String'],
  type: Maybe<GQLSearchResultType>,
  id: Scalars['ID'],
}

export enum GQLSearchResultType {
  Track = 'TRACK',
  Album = 'ALBUM',
  Artist = 'ARTIST',
  Playlist = 'PLAYLIST'
}

export interface GQLSection {
   __typename: 'Section',
  id: Scalars['ID'],
  title: Scalars['String'],
  items: Array<GQLSectionItem>,
}

export interface GQLSectionItem {
   __typename: 'SectionItem',
  id: Scalars['ID'],
  name: Scalars['String'],
  cover: Scalars['String'],
  type: GQLSectionType,
  contentId: Scalars['ID'],
}

export enum GQLSectionType {
  Album = 'ALBUM',
  Artist = 'ARTIST',
  Playlist = 'PLAYLIST'
}

export interface GQLSong {
   __typename: 'Song',
  id: Scalars['ID'],
  name: Scalars['String'],
  artist: Scalars['ID'],
  album: Scalars['ID'],
}

export interface GQLUser {
   __typename: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
}

export type GQLGetArtistQueryVariables = {
  id: Scalars['ID']
};


export type GQLGetArtistQuery = { __typename: 'Query', artist: { __typename: 'Artist', id: string, name: string, cover: string, listeners: number, popular: Array<{ __typename: 'Song', name: string, album: string }> } };

export type GQLGetFeedQueryVariables = {};


export type GQLGetFeedQuery = { __typename: 'Query', feed: { __typename: 'Feed', id: string, sections: Array<{ __typename: 'Section', id: string, title: string, items: Array<{ __typename: 'SectionItem', id: string, contentId: string, name: string, cover: string, type: GQLSectionType }> }> } };

export type GQLGetSearchResultsQueryVariables = {
  term: Scalars['String']
};


export type GQLGetSearchResultsQuery = { __typename: 'Query', search: Array<{ __typename: 'SearchResult', type: Maybe<GQLSearchResultType>, name: string, id: string }> };



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Feed: ResolverTypeWrapper<GQLFeed>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Section: ResolverTypeWrapper<GQLSection>,
  String: ResolverTypeWrapper<Scalars['String']>,
  SectionItem: ResolverTypeWrapper<GQLSectionItem>,
  SectionType: GQLSectionType,
  Artist: ResolverTypeWrapper<GQLArtist>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Song: ResolverTypeWrapper<GQLSong>,
  SearchResult: ResolverTypeWrapper<GQLSearchResult>,
  SearchResultType: GQLSearchResultType,
  Album: ResolverTypeWrapper<GQLAlbum>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Node: ResolverTypeWrapper<GQLNode>,
  User: ResolverTypeWrapper<GQLUser>,
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
  Query: {},
  Feed: GQLFeed,
  ID: Scalars['ID'],
  Section: GQLSection,
  String: Scalars['String'],
  SectionItem: GQLSectionItem,
  SectionType: GQLSectionType,
  Artist: GQLArtist,
  Int: Scalars['Int'],
  Song: GQLSong,
  SearchResult: GQLSearchResult,
  SearchResultType: GQLSearchResultType,
  Album: GQLAlbum,
  Boolean: Scalars['Boolean'],
  Node: GQLNode,
  User: GQLUser,
};

export type GQLAlbumResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Album'] = GQLResolversParentTypes['Album']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  artist: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  songs: Resolver<Array<GQLResolversTypes['ID']>, ParentType, ContextType>,
  cover: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLArtistResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Artist'] = GQLResolversParentTypes['Artist']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  listeners: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  cover: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  popular: Resolver<Array<GQLResolversTypes['Song']>, ParentType, ContextType>,
};

export type GQLFeedResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Feed'] = GQLResolversParentTypes['Feed']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  sections: Resolver<Array<GQLResolversTypes['Section']>, ParentType, ContextType>,
};

export type GQLNodeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Node'] = GQLResolversParentTypes['Node']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  feed: Resolver<GQLResolversTypes['Feed'], ParentType, ContextType>,
  artist: Resolver<GQLResolversTypes['Artist'], ParentType, ContextType, RequireFields<GQLQueryArtistArgs, 'id'>>,
  search: Resolver<Array<GQLResolversTypes['SearchResult']>, ParentType, ContextType, RequireFields<GQLQuerySearchArgs, 'term'>>,
  album: Resolver<GQLResolversTypes['Album'], ParentType, ContextType, RequireFields<GQLQueryAlbumArgs, 'id'>>,
};

export type GQLSearchResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SearchResult'] = GQLResolversParentTypes['SearchResult']> = {
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  type: Resolver<Maybe<GQLResolversTypes['SearchResultType']>, ParentType, ContextType>,
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
};

export type GQLSectionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Section'] = GQLResolversParentTypes['Section']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  title: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  items: Resolver<Array<GQLResolversTypes['SectionItem']>, ParentType, ContextType>,
};

export type GQLSectionItemResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SectionItem'] = GQLResolversParentTypes['SectionItem']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  cover: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  type: Resolver<GQLResolversTypes['SectionType'], ParentType, ContextType>,
  contentId: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
};

export type GQLSongResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Song'] = GQLResolversParentTypes['Song']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  artist: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  album: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
};

export type GQLUserResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLResolvers<ContextType = any> = {
  Album: GQLAlbumResolvers<ContextType>,
  Artist: GQLArtistResolvers<ContextType>,
  Feed: GQLFeedResolvers<ContextType>,
  Node: GQLNodeResolvers<ContextType>,
  Query: GQLQueryResolvers<ContextType>,
  SearchResult: GQLSearchResultResolvers<ContextType>,
  Section: GQLSectionResolvers<ContextType>,
  SectionItem: GQLSectionItemResolvers<ContextType>,
  Song: GQLSongResolvers<ContextType>,
  User: GQLUserResolvers<ContextType>,
};


