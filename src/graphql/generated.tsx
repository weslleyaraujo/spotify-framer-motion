import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Album = {
   __typename?: 'Album',
  id: Scalars['ID'],
  name: Scalars['String'],
  artist: Artist,
  songs: Array<Song>,
  cover: Image,
};

export type Artist = {
   __typename?: 'Artist',
  id: Scalars['ID'],
  name: Scalars['String'],
  monthly_listeners: Scalars['Int'],
  cover: Image,
};

export type Feed = Node & {
   __typename?: 'Feed',
  id: Scalars['ID'],
};

export type Image = {
   __typename?: 'Image',
  url: Scalars['String'],
};

export type Node = {
   __typename?: 'Node',
  id: Scalars['ID'],
};

export type Query = {
   __typename?: 'Query',
  user: User,
  feed: Feed,
};

export type Song = {
   __typename?: 'Song',
  id: Scalars['ID'],
  name: Scalars['String'],
  artist_id: Scalars['ID'],
  album_id: Scalars['ID'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
};
