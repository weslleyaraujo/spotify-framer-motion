/** @jsx jsx */
import { jsx } from "@emotion/core";
import { View, useViewStyles } from "../../atoms/View/View";
import { TextLine } from "../../atoms/TextLine/TextLine";
import { Fragment } from "react";

interface Props
  extends Pick<
    React.ComponentProps<typeof View>,
    "padding" | "justify" | "align"
  > {
  title?: string;
  children: React.ReactNode;
  subtitle?: string;
  head: Pick<
    React.ComponentProps<typeof View>,
    "padding" | "justify" | "align"
  >;
}

interface DefaultProps
  extends Required<Pick<Props, "head" | "padding" | "justify" | "align">> {}

function Section({
  title,
  children,
  subtitle,
  padding,
  justify,
  head
}: Props & DefaultProps) {
  const view = useViewStyles({
    padding,
    justify,
    margin: "none"
  });
  return (
    <Fragment>
      {(title || subtitle) && (
        <View {...head} direction="column">
          {title && (
            <TextLine text={title} color="foregroundPrimary" type="heading" />
          )}
          {subtitle && <TextLine text={subtitle} color="foregroundSecondary" />}
        </View>
      )}
      <div
        css={{
          ...view,
          display: "block"
        }}
      >
        {children}
      </div>
    </Fragment>
  );
}

const defaultProps: DefaultProps = {
  justify: "center",
  align: "center",
  padding: "large",
  head: {
    align: "center",
    justify: "center",
    padding: ["medium", "medium", "none", "medium"]
  }
};

Section.defaultProps = defaultProps;

export { Section };
