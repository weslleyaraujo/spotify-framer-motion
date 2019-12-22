/** @jsx jsx */
import { jsx } from "@emotion/core";
import { isApolloError } from "apollo-boost";
import { Fragment, useEffect, useMemo } from "react";
import { Icon } from "../../../components/atoms/Icon/Icon";
import { TextLine } from "../../../components/atoms/TextLine/TextLine";
import { View } from "../../../components/atoms/View/View";
import { Icons } from "../../../foundations/icons";

interface Props {
  title?: string;
  body?: string;
  error?: string | Error;
}

interface DefaultProps extends Required<Pick<Props, "title">> {}

const defaultProps: DefaultProps = {
  title: "Something went wrong"
};

function ErrorView({ error, title, body }: Props & DefaultProps) {
  const message = useMemo(() => {
    if (!error) {
      return "";
    }

    if (error instanceof Error) {
      if (isApolloError(error)) {
        return `Apollo: ${error.message}`;
      }

      return `Error: ${error.message}`;
    }
  }, [error]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(message);
    }
  }, [message]);

  return (
    <Fragment>
      <View align="center" justify="center">
        <Icon<Icons> type="magnifyingGlassOutline" size="larger" />
      </View>
      <TextLine text="Hello World" textAlign="center" type="title" />
      <View margin={["medium", "none"]}>
        <TextLine text="Hello World" textAlign="center" type="featured" />
      </View>
      {process.env.NODE_ENV === "development" && (
        <View>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word"
            }}
          >
            <TextLine type="heading">{JSON.stringify(error, null, 2)}</TextLine>
          </pre>
        </View>
      )}
    </Fragment>
  );
}

export { ErrorView };
