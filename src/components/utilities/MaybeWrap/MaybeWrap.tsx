import React from "react";

const MaybeWrap: React.FunctionComponent<{
  condition: boolean;
  wrap: React.FunctionComponent<{}>;
}> = (
  { condition, children, wrap } = {
    condition: false,
    children: <React.Fragment />,
    wrap: () => null
  }
) => <>{condition ? wrap({ children }) : children}</>;

export { MaybeWrap };
