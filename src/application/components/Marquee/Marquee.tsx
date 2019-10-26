/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import { useMemo } from "react";

const animation = keyframes({
  "0%": {
    transform: `translateX(100%)`
  },
  "100%": {
    transform: `translateX(-100%)`
  }
});
function Marquee({
  children,
  length
}: {
  children: React.ReactNode;
  length: number;
}) {
  const ms = useMemo(() => length * 0.43, [length]);

  return (
    <div
      css={{
        position: "relative",
        overflow: "hidden",
        whiteSpace: "nowrap"
      }}
    >
      <div
        css={{
          transform: "translateX(100%)",
          display: "inline-block",
          animationDuration: `${ms}s`,
          animationName: animation,
          animationIterationCount: "infinite",
          animationTimingFunction: "linear"
        }}
      >
        {children}
      </div>
    </div>
  );
}

export { Marquee };
