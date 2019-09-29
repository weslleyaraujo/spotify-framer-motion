export type Action<T = {}> = {
  as: React.ReactType | string;
} & T;
