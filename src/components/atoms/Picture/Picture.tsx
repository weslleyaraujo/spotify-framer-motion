import {
  MediaAspectRatio,
  MediaOrientation,
  MediaResizeMode
} from "../../../interfaces/Media";
import { Variants, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { ObjectFitProperty } from "csstype";
import { Theme } from "../../../foundations/Theme";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useInView } from "react-intersection-observer";
import { useTheme } from "emotion-theming";

interface PictureProps {
  /** Image Url */
  source: string;

  /** Changes how the image will fit in its container. Default: "cover" */
  resizeMode?: MediaResizeMode;

  /** Calculates the height of the container give its width. Default: "standard" */
  aspectRatio?: MediaAspectRatio;

  /** Determines whether the aspect ratio will be landscape (e.g.: 3:4) or portrait (e.g. 4:3). Default: "landscape" */
  orientation?: MediaOrientation;

  /** Image width can be number or a percentage (e.g. '100%') string. */
  width?: number | string;

  /** Image height can be number or a percentage (e.g. '100%') string. */
  height?: number | string;

  /** Callback executed when the image fails to load. */
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;

  /** Callback executed when the image loads. */
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;

  /** Used for a11y. Send it as an empty string if you're using a decorative image  */
  alt: string;

  /** Optional children to render over Picture */
  children?: React.ReactNode;
}

interface PictureDefaultProps
  extends Required<
    Pick<
      PictureProps,
      "resizeMode" | "aspectRatio" | "orientation" | "onError" | "onLoad"
    >
  > {}

const defaultProps: PictureDefaultProps = {
  resizeMode: "cover",
  aspectRatio: "standard",
  orientation: "landscape",
  onError: () => {},
  onLoad: () => {}
};

function Picture(props: PictureProps & PictureDefaultProps) {
  const {
    children,
    aspectRatio,
    orientation,
    source,
    resizeMode,
    onError,
    onLoad,
    alt,
    width,
    height
  } = props;

  const [error, setError] = useState(false);
  const [viewed, setViewed] = useState(false);
  const theme = useTheme<Theme>();
  const [ref, inView] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (viewed) {
      return;
    }

    if (inView && !viewed) {
      setViewed(true);
    }
  }, [inView, viewed]);

  const variants: Variants = {
    visible: { opacity: viewed ? 1 : 0 },
    initial: { opacity: 0 }
  };

  const paddingBottom = useMemo(
    () =>
      `calc(100% / ${
        height
          ? height
          : getAspectRatioValueWithLayout(aspectRatio, orientation)
      })`,
    [aspectRatio, orientation, height]
  );

  const objectFit = useMemo(() => getResizeMode(resizeMode), [resizeMode]);

  return (
    <figure
      css={{
        margin: "unset",
        width: width || "100%",
        height: height || "100%",
        position: "relative",
        ...(error && {
          backgroundColor: theme.colors.absoluteDark
        })
      }}
      ref={ref}
      style={{ paddingBottom }}
    >
      <picture>
        {(inView && !viewed) ||
          (viewed && (
            <motion.img
              alt={alt}
              src={source}
              variants={variants}
              animate={viewed ? "visible" : "initial"}
              css={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0
              }}
              style={{ objectFit }}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                setError(true);
                onError(e);
              }}
              onLoad={onLoad}
            />
          ))}
      </picture>
      {children && (
        <div
          css={{
            display: "flex",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden"
          }}
        >
          {children}
        </div>
      )}
    </figure>
  );
}

Picture.defaultProps = defaultProps;

function getAspectRatioValue(
  aspectRatio: MediaAspectRatio | undefined
): number {
  switch (aspectRatio) {
    case "classic": // 3/2;
      return 1.5;

    case "square": // 1/1
      return 1;

    case "widescreen": // 16/9;
      return 1.777;

    case "panorama": // 3/1;
      return 3;

    case "standard": // 14/3
    default:
      return 1.333;
  }
}

function getAspectRatioValueWithLayout(
  aspectRatio?: MediaAspectRatio,
  orientation?: MediaOrientation
): number {
  const value = getAspectRatioValue(aspectRatio);
  if (orientation === "portrait") {
    return 1 / value;
  }
  return value;
}

function getResizeMode(resizeMode: MediaResizeMode) {
  const modes: { [key in MediaResizeMode]: ObjectFitProperty } = {
    cover: "cover",
    stretch: "fill",
    contain: "contain"
  };

  return modes[resizeMode];
}

export { Picture };
