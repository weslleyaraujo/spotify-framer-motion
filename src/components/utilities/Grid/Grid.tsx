/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Units } from "../../../foundations/Spacing";
import { theme } from "../../../application/application-theme";

type Gap = keyof Units | "none";

interface GridProps {
  children: React.ReactNode;
  gap?: Gap | [Gap, Gap];
  itemsPerRow?: number;
}

interface GridDefaultProps
  extends Required<Pick<GridProps, "gap" | "itemsPerRow">> {}

const defaultProps: GridDefaultProps = {
  gap: "small",
  itemsPerRow: 1
};

function useGapMap({
  gap
}: Pick<GridProps, "gap">): {
  horizontal: number;
  vertical: number;
} {
  const empty: ReturnType<typeof useGapMap> = {
    horizontal: 0,
    vertical: 0
  };

  if (gap === "none" || gap === undefined) {
    return empty;
  }

  if (Array.isArray(gap)) {
    const [first, second] = gap;
    if (!first && !second) {
      return empty;
    }

    return {
      ...empty,
      ...(first !== "none" && { horizontal: theme.units[first] }),
      ...(second !== "none" && { vertical: theme.units[second] })
    };
  }

  return {
    horizontal: theme.units[gap],
    vertical: theme.units[gap]
  };
}

function Grid({ gap, itemsPerRow, children }: GridProps) {
  const { vertical, horizontal } = useGapMap({
    gap
  });
  return (
    <div
      css={{
        gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
        display: "grid",
        gridGap: `${vertical}px ${horizontal}px `,
        marginBottom: 0
      }}
    >
      {children}
    </div>
  );
}

Grid.defaultProps = defaultProps;

export { Grid };
