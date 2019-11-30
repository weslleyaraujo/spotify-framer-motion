import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
}

export interface GQLAlbum {
  id: Scalars['ID'],
  name: Scalars['String'],
  artist: Scalars['ID'],
  songs: Array<GQLSong>,
  cover: GQLImage,
}

export interface GQLAlbumItem  extends GQLItem {
   __typename: 'AlbumItem',
  id: Scalars['ID'],
  name: Scalars['String'],
  artist: Scalars['ID'],
  songs: Array<GQLSong>,
  cover: GQLImage,
}

export interface GQLArtist {
  id: Scalars['ID'],
  name: Scalars['String'],
  monthly_listeners: Scalars['Int'],
  cover: GQLImage,
}

export interface GQLArtistItem  extends GQLItem {
   __typename: 'ArtistItem',
  id: Scalars['ID'],
  name: Scalars['String'],
}

export interface GQLFeed {
   __typename: 'Feed',
  id: Scalars['ID'],
  sections: Array<GQLSection>,
}

/** 
 * ==
 * Global interfaces
 * ==
 */
export interface GQLImage {
   __typename: 'Image',
  url: Scalars['String'],
}

export interface GQLItem {
  id: Scalars['ID'],
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

export interface GQLPlaylistItem  extends GQLItem {
   __typename: 'PlaylistItem',
  id: Scalars['ID'],
  name: Scalars['String'],
}

export interface GQLQuery {
   __typename: 'Query',
  user: GQLUser,
  feed: GQLFeed,
}

export interface GQLSection {
   __typename: 'Section',
  id: Scalars['ID'],
  title: Scalars['String'],
  items: Array<GQLItem>,
}

export interface GQLSong {
  id: Scalars['ID'],
  name: Scalars['String'],
  artist_id: Scalars['ID'],
  album_id: Scalars['ID'],
}

export interface GQLUser {
   __typename: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
}

export type GQLGetFeedQueryVariables = {};


export type GQLGetFeedQuery = (
  { __typename: 'Query' }
  & { feed: (
    { __typename: 'Feed' }
    & Pick<GQLFeed, 'id'>
    & { sections: Array<(
      { __typename: 'Section' }
      & Pick<GQLSection, 'id' | 'title'>
    )> }
  ) }
);



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
  User: ResolverTypeWrapper<GQLUser>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Feed: ResolverTypeWrapper<GQLFeed>,
  Section: ResolverTypeWrapper<GQLSection>,
  Item: ResolverTypeWrapper<GQLItem>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Image: ResolverTypeWrapper<GQLImage>,
  Artist: ResolverTypeWrapper<GQLArtist>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Album: ResolverTypeWrapper<GQLAlbum>,
  Song: ResolverTypeWrapper<GQLSong>,
  Node: ResolverTypeWrapper<GQLNode>,
  AlbumItem: ResolverTypeWrapper<GQLAlbumItem>,
  ArtistItem: ResolverTypeWrapper<GQLArtistItem>,
  PlaylistItem: ResolverTypeWrapper<GQLPlaylistItem>,
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
  Query: {},
  User: GQLUser,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Feed: GQLFeed,
  Section: GQLSection,
  Item: GQLItem,
  Boolean: Scalars['Boolean'],
  Image: GQLImage,
  Artist: GQLArtist,
  Int: Scalars['Int'],
  Album: GQLAlbum,
  Song: GQLSong,
  Node: GQLNode,
  AlbumItem: GQLAlbumItem,
  ArtistItem: GQLArtistItem,
  PlaylistItem: GQLPlaylistItem,
};

export type GQLAlbumResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Album'] = GQLResolversParentTypes['Album']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>,
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  artist: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  songs: Resolver<Array<GQLResolversTypes['Song']>, ParentType, ContextType>,
  cover: Resolver<GQLResolversTypes['Image'], ParentType, ContextType>,
};

export type GQLAlbumItemResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AlbumItem'] = GQLResolversParentTypes['AlbumItem']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  artist: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  songs: Resolver<Array<GQLResolversTypes['Song']>, ParentType, ContextType>,
  cover: Resolver<GQLResolversTypes['Image'], ParentType, ContextType>,
};

export type GQLArtistResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Artist'] = GQLResolversParentTypes['Artist']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>,
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  monthly_listeners: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>,
  cover: Resolver<GQLResolversTypes['Image'], ParentType, ContextType>,
};

export type GQLArtistItemResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArtistItem'] = GQLResolversParentTypes['ArtistItem']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLFeedResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Feed'] = GQLResolversParentTypes['Feed']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  sections: Resolver<Array<GQLResolversTypes['Section']>, ParentType, ContextType>,
};

export type GQLImageResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Image'] = GQLResolversParentTypes['Image']> = {
  url: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLItemResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Item'] = GQLResolversParentTypes['Item']> = {
  __resolveType: TypeResolveFn<'AlbumItem' | 'ArtistItem' | 'PlaylistItem', ParentType, ContextType>,
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
};

export type GQLNodeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Node'] = GQLResolversParentTypes['Node']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
};

export type GQLPlaylistItemResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['PlaylistItem'] = GQLResolversParentTypes['PlaylistItem']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  user: Resolver<GQLResolversTypes['User'], ParentType, ContextType>,
  feed: Resolver<GQLResolversTypes['Feed'], ParentType, ContextType>,
};

export type GQLSectionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Section'] = GQLResolversParentTypes['Section']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  title: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  items: Resolver<Array<GQLResolversTypes['Item']>, ParentType, ContextType>,
};

export type GQLSongResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Song'] = GQLResolversParentTypes['Song']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>,
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
  artist_id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  album_id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
};

export type GQLUserResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']> = {
  id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>,
  name: Resolver<GQLResolversTypes['String'], ParentType, ContextType>,
};

export type GQLResolvers<ContextType = any> = {
  Album: GQLAlbumResolvers,
  AlbumItem: GQLAlbumItemResolvers<ContextType>,
  Artist: GQLArtistResolvers,
  ArtistItem: GQLArtistItemResolvers<ContextType>,
  Feed: GQLFeedResolvers<ContextType>,
  Image: GQLImageResolvers<ContextType>,
  Item: GQLItemResolvers,
  Node: GQLNodeResolvers<ContextType>,
  PlaylistItem: GQLPlaylistItemResolvers<ContextType>,
  Query: GQLQueryResolvers<ContextType>,
  Section: GQLSectionResolvers<ContextType>,
  Song: GQLSongResolvers,
  User: GQLUserResolvers<ContextType>,
};


