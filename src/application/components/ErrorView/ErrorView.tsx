/** @jsx jsx */
import { jsx } from "@emotion/core";
import { isApolloError } from "apollo-boost";
import { Fragment, useEffect, useMemo } from "react";
import { Icon } from "../../../components/atoms/Icon/Icon";
import { TextLine } from "../../../components/atoms/TextLine/TextLine";
import { View } from "../../../components/atoms/View/View";
import { Icons } from "../../../foundations/icons";

interface ErrorViewProps {
  title?: string;
  body?: string;
  error?: string | Error;
}

interface ErrorViewDefaultProps
  extends Required<Pick<ErrorViewProps, "title">> {}

const defaultProps: ErrorViewDefaultProps = {
  title: "Something went wrong"
};

function ErrorView({
  error,
  title,
  body
}: ErrorViewProps & ErrorViewDefaultProps) {
  const message = useMemo(() => {
    if (!error) {
      return "";
    }

    if (error instanceof Error) {
      if (isApolloError(error)) {
        return `Apollo Error: ${error.message}`;
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
      <TextLine text={title} textAlign="center" type="title" />
      {body && (
        <View margin={["medium", "none"]}>
          <TextLine text={body} textAlign="center" type="featured" />
        </View>
      )}
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

ErrorView.defaultProps = defaultProps;

export { ErrorView };
