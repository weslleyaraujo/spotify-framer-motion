/** @jsx jsx */
// Based on framer-motion example: https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?fontsize=14&module=%2Fsrc%2FExample.tsx
import { jsx } from "@emotion/core";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  Variants,
  useTransform
} from "framer-motion";
import {
  Children,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState
} from "react";
import useDimensions from "react-use-dimensions";

type RangeFunction = (min: number, max: number, v: number) => any;

const range = (func: RangeFunction) => (min: number, max: number, v?: number) =>
  v !== undefined ? func(min, max, v) : (cv: number) => func(min, max, cv);

const wrap = range((min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
});

const animations: Variants = {
  enter: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000
  }),
  center: {
    x: 0,
    zIndex: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000
  })
};

const SongDisplay: React.FC<{ itemsHeight: number | string }> = forwardRef(
  function SongDisplay({ itemsHeight: height, children }, ref) {
    const handle = useMotionValue(1);
    const opacity = useTransform(handle, value =>
      value >= 0 ? value : undefined
    );
    const items = useMemo(() => Children.toArray(children), [children]);
    const [[page, direction], setPage] = useState([0, 0]);
    const [rootRef, { width }] = useDimensions({
      liveMeasure: true
    });

    const index = wrap(0, items.length, page);
    const paginate = useCallback(
      (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
      },
      [page]
    );

    const next = useCallback(() => paginate(1), [paginate]);
    const prev = useCallback(() => paginate(-1), [paginate]);

    useImperativeHandle(
      ref,
      () => ({
        prev,
        next
      }),
      [prev, next]
    );

    return (
      <div
        ref={rootRef}
        css={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "relative",
          height
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            variants={animations}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 200 }
            }}
            drag="x"
            dragElastic={0.8}
            dragConstraints={{
              left: 0,
              right: 0
            }}
            onDragEnd={(event, { point, offset, velocity }) => {
              if (Math.abs(point.x) >= width / 2) {
                point.x <= 0 ? next() : prev();
                return;
              }
            }}
            onUpdate={latest => {
              if (latest.x) {
                const value = Math.abs(
                  (Math.abs(Number(latest.x)) * 100) / width
                );

                const next = 1 - value / 100;

                // If the next opacity is >= 0.3 it means that the element is partially to close to the edges and
                // in this case we want to speed up its opacity to a zero so it disappears completely
                if (1 - next >= 0.3) {
                  handle.set(next - 0.5);
                  return;
                }

                handle.set(next);
              }
            }}
            css={{
              label: "item",
              position: "absolute",
              width: "100%"
            }}
            style={{
              opacity
            }}
          >
            {items[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

export { SongDisplay };
