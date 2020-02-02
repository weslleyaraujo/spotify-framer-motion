/** @jsx jsx */
import { jsx } from "@emotion/core";

interface RingProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

function Ring({ children, width, height }: RingProps) {
  return (
    <div
      css={{
        width,
        height,
        borderRadius: 4000,
        overflow: "hidden"
      }}
    >
      {children}
    </div>
  );
}

export { Ring };
