/** @jsx jsx */

import { Theme } from "./Theme";
import { jsx } from "@emotion/core";

export type Icons =
  | "pencil"
  | "settings"
  | "homeOutline"
  | "homeFill"
  | "magnifyingGlassOutline"
  | "magnifyingGlassFill"
  | "libraryOutline"
  | "libraryFill"
  | "dotsVertical"
  | "strokePlay"
  | "strokeArrowUp";

const icons: Theme<Icons>["icons"] = {
  libraryFill: ({ width, height, color }) => (
    <svg
      viewBox="0 0 512 512"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M311.873 77.46l166.349 373.587-39.111 17.27-166.349-373.587zM64 463.746v-384h42.666v384h-42.666zM170.667 463.746v-384h42.667v384h-42.666z"
        fill={color}
      ></path>
    </svg>
  ),
  libraryOutline: ({ width, height, color }) => (
    <svg
      viewBox="0 0 512 512"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z"
        fill={color}
      ></path>
    </svg>
  ),
  magnifyingGlassFill: ({ color, width, height }) => (
    <svg
      viewBox="0 0 512 512"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M357.079 341.334l94.476 110.73-32.508 27.683-94.222-110.476q-45.714 30.476-100.826 30.476-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 23.365-5.841 45.714t-16.635 41.651-25.778 35.555zM224 357.079q28.19 0 53.841-11.048t44.19-29.587 29.587-44.19 11.048-53.841-11.048-53.841-29.587-44.191-44.19-29.587-53.841-11.047-53.841 11.047-44.191 29.588-29.587 44.19-11.047 53.841 11.047 53.841 29.588 44.19 44.19 29.587 53.841 11.048z"
        fill={color}
      ></path>
    </svg>
  ),
  magnifyingGlassOutline: ({ width, height, color }) => (
    <svg
      viewBox="0 0 512 512"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z"
        fill={color}
        fillRule="evenodd"
      ></path>
    </svg>
  ),
  homeFill: ({ width, height, color }) => (
    <svg
      viewBox="0 0 512 512"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z"
      ></path>
    </svg>
  ),
  homeOutline: ({ width, height, color }) => (
    <svg
      viewBox="0 0 512 512"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 256.274 60.84 L 84.324 166.237 L 84.324 443.063 L 193.27 443.063 L 193.27 293.73 L 320.228 293.73 L 320.228 443.063 L 428.222 443.063 L 428.222 165.476 L 256.274 60.84 Z M 256.274 35.95 L 448.452 149.145 L 448.452 464.395 L 300 464.395 L 300 315.062 L 213.499 315.062 L 213.499 464.395 L 64.095 464.395 L 64.095 150.161 L 256.274 35.95 Z"
        fill={color}
      ></path>
    </svg>
  ),
  pencil: ({ width, height }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  ),
  settings: ({ color, width, height }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={3} />
      <path
        color={color}
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      />
    </svg>
  ),
  dotsVertical: ({ width, height, color }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M298 94.5C298 117.972 278.972 137 255.5 137C232.028 137 213 117.972 213 94.5C213 71.0279 232.028 52 255.5 52C278.972 52 298 71.0279 298 94.5Z"
        fill={color}
      />
      <path
        d="M298 256C298 279.472 278.972 298.5 255.5 298.5C232.028 298.5 213 279.472 213 256C213 232.528 232.028 213.5 255.5 213.5C278.972 213.5 298 232.528 298 256Z"
        fill={color}
      />
      <path
        d="M298 417.5C298 440.972 278.972 460 255.5 460C232.028 460 213 440.972 213 417.5C213 394.028 232.028 375 255.5 375C278.972 375 298 394.028 298 417.5Z"
        fill={color}
      />
    </svg>
  ),
  strokePlay: ({ width, height, color }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M52.5 26.5C52.5 40.8594 40.8594 52.5 26.5 52.5C12.1406 52.5 0.5 40.8594 0.5 26.5C0.5 12.1406 12.1406 0.5 26.5 0.5C40.8594 0.5 52.5 12.1406 52.5 26.5ZM26.5 51.5C40.3071 51.5 51.5 40.3071 51.5 26.5C51.5 12.6929 40.3071 1.5 26.5 1.5C12.6929 1.5 1.5 12.6929 1.5 26.5C1.5 40.3071 12.6929 51.5 26.5 51.5ZM20 37.1129V15.8871L37.5344 26.5L20 37.1129Z"
        fill={color}
        stroke={color}
      />
    </svg>
  ),
  strokeArrowUp: ({ width, height, color }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 35L27.5 21L40 35" stroke={color} stroke-width="2" />
    </svg>
  )
};

export { icons };
