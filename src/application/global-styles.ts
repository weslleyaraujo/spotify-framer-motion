import { css, InterpolationWithTheme } from "@emotion/core";

import circular from "../assets/fonts/circular-book.woff2";
import circularBlack from "../assets/fonts/circular-black.woff2";
import circularBold from "../assets/fonts/circular-bold.woff2";
import { Theme } from "../foundations/Theme";

const globalStyles: InterpolationWithTheme<Theme> = theme => css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  html,
  body,
  #root {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    background-color: ${theme.colors.background};
  }
  * {
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
  @font-face {
    font-family: "Circular";
    src: local("Circular"), url(${circular}) format("truetype");
  }

  @font-face {
    font-family: "Circular Black";
    src: local("Circular Black"), url(${circularBlack}) format("truetype");
  }

  @font-face {
    font-family: "Circular Bold";
    src: local("Circular Bold"), url(${circularBold}) format("truetype");
  }
`;

export { globalStyles };
