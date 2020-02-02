import { ForegroundColors } from "../TextLine/TextLine";
import { Scales } from "../../../foundations/Spacing";
import { Theme } from "../../../foundations/Theme";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { keyframes } from "@emotion/core";
import { useTheme } from "emotion-theming";

interface ActivityIndicatorProps {
  /** Size of the spinner. Default: "medium" */
  size?: keyof Scales;

  /** Color of the spinner. Default: "foregroundPrimary */
  color?: ForegroundColors;
}

interface ActivityInidicatorDefaultProps
  extends Required<Pick<ActivityIndicatorProps, "size" | "color">> {}

const defaultProps: ActivityIndicatorDefaultProps = {
  size: "medium",
  color: "foregroundPrimary"
};

const spin = keyframes({
  "100%": {
    transform: "rotate(360deg)"
  }
});

function ActivityIndicator({
  color,
  size
}: ActivityIndicatorProps & ActivityIndicatorDefaultProps) {
  const theme = useTheme<Theme>();
  return (
    <svg
      viewBox="0 0 1024 1024"
      css={{
        animation: `${spin} 1s infinite linear`
      }}
      width={theme.scales[size]}
      height={theme.scales[size]}
      role="img"
    >
      <path
        fill={theme.colors[color]}
        d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
      />
    </svg>
  );
}

ActivityIndicator.defaultProps = defaultProps;

export { ActivityIndicator };
