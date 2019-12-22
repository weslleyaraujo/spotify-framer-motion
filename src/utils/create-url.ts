import { stringify } from "query-string";

function interpolate(pathname: string, parameters: Object): string {
  return Object.entries(parameters).reduce<string>(
    (acc: string, [key, value]) => acc.replace(`:${key}`, String(value)),
    pathname
  );
}

function createUrl<T extends Object = Object, U extends Object = Object>(
  path: string,
  {
    interpolate: parameters,
    query: queryParameters
  }: {
    interpolate?: T;
    query?: U;
  } = {}
): string {
  const query = !queryParameters ? "" : `?${stringify(queryParameters)}`;
  return `${interpolate(path, parameters || {})}${query}`;
}

export { createUrl };
