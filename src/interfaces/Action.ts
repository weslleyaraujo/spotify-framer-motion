export type Action<T = {}> = {
  as: keyof JSX.IntrinsicElements;
} & T;
