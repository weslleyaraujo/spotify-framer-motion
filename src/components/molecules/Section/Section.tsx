/** @jsx jsx */
import { jsx } from "@emotion/core";
import { View, useViewStyles } from "../../atoms/View/View";
import { TextLine } from "../../atoms/TextLine/TextLine";
import { Fragment } from "react";

interface SectionProps
  extends Pick<
    React.ComponentProps<typeof View>,
    "padding" | "justify" | "align"
  > {
  head: Pick<
    React.ComponentProps<typeof View>,
    "padding" | "justify" | "align"
  >;
  title?: string;
  titleType?: React.ComponentProps<typeof TextLine>["type"];
  subtitle?: string;
  children: React.ReactNode;
}

interface SectionDefaultProps
  extends Required<
    Pick<SectionProps, "head" | "padding" | "justify" | "align" | "titleType">
  > {}

function Section({
  title,
  children,
  subtitle,
  padding,
  justify,
  head,
  titleType
}: SectionProps & SectionDefaultProps) {
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
            <TextLine text={title} color="foregroundPrimary" type={titleType} />
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

const defaultProps: SectionDefaultProps = {
  justify: "center",
  align: "center",
  padding: "large",
  titleType: "heading",
  head: {
    align: "center",
    justify: "center",
    padding: ["medium", "medium", "none", "medium"]
  }
};

Section.defaultProps = defaultProps;

export { Section };
