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
  artist: Artist,
  songs: Array<Song>,
};

export type Artist = {
   __typename?: 'Artist',
  id: Scalars['ID'],
  name: Scalars['String'],
  monthly_listeners: Scalars['Int'],
  cover: Image,
};

export type Image = {
   __typename?: 'Image',
  url: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  user: User,
};

export type Song = {
   __typename?: 'Song',
  id: Scalars['ID'],
  name: Scalars['String'],
  artist: Artist,
  album: Album,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
};
