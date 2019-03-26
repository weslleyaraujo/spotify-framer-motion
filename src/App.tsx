import React from "react";
import { Text } from "./components/atoms/Text/Text";
import { Global, css } from "@emotion/core";

function App() {
  return (
    <React.Fragment>
      <Global
        styles={css`
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
        `}
      />
      <Text
        as="h1"
        type="display"
        text="Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="heading"
        text="Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="title"
        text="Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="subtitle"
        text="Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="featured"
        text="Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="body"
        text="Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="strong"
        text="Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
      <Text
        as="p"
        type="caption"
        text="Lorem ipsum dollor sit ammet stuff here blah example"
        color="neutral"
        numberOfLines={2}
      />
    </React.Fragment>
  );
}

export default App;
