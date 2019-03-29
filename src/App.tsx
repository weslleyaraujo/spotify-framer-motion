/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Text } from "./components/atoms/Text/Text";
import { View, useViewStyles } from "./components/atoms/View/View";
import { Global, css } from "@emotion/core";
import { useTheme } from "./foundations/useTheme";

function App() {
  const theme = useTheme();
  const view = useViewStyles({
    padding: "large"
  });
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
      <View
        margin={["large", "none"]}
        padding="large"
        justify="center"
        style={{ backgroundColor: theme.colors.complementary }}
        radius="small"
      >
        <Text
          as="p"
          type="title"
          text="This is View"
          color="white"
          numberOfLines={2}
        />
      </View>
      <div css={view}>Something extra</div>
    </React.Fragment>
  );
}

export default App;
