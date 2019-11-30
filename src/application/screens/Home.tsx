import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Icon } from "../../components/atoms/Icon/Icon";
import { Picture } from "../../components/atoms/Picture/Picture";
import { View } from "../../components/atoms/View/View";
import { Section } from "../../components/molecules/Section/Section";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { Scrollable } from "../../components/utilities/Scrollable/Scrollable";
import { Icons } from "../../foundations/icons";
import { useBodyBackground } from "../../hooks/use-body-background";
import { SITEMAP } from "../site-map";
import { AnimatedMinimize } from "../../components/utilities/AnimatedMinimize/AnimatedMinimize";

import sourceAlbum from "../../assets/images/tame-impala-currents.jpeg";
import sourceAlbum2 from "../../assets/images/parcels-parcels.jpeg";
import { gql } from "apollo-boost";
import {
  GQLGetFeedQuery,
  GQLGetFeedQueryVariables
} from "../../graphql/generated";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { LoadingView } from "../../components/utilities/LoadingView/LoadingView";
import { CardCover } from "../components/CardCover/CardCover";

interface Props {}

function Home(props: Props) {
  const { data, loading, error } = useQuery<
    GQLGetFeedQuery,
    GQLGetFeedQueryVariables
  >(gql`
    query GetFeed {
      feed @client {
        id
        sections {
          id
          title
          items {
            id
            name
            cover
            type
          }
        }
      }
    }
  `);

  useBodyBackground({
    color: "yellow",
    gradientStyle: "topLeft"
  });

  if (error) {
    return <TextLine text="ErrorView TODO" />;
  }

  if (loading) {
    return <LoadingView />;
  }

  return (
    <FadePresence>
      <AnimatedMinimize
        disableBackground
        disableScaling
        content={
          <View justify="flex-end" padding="medium">
            <Link to={SITEMAP.SETTINGS}>
              <Icon<Icons> type="settings" color="absoluteLight" size="small" />
            </Link>
          </View>
        }
      >
        {data?.feed.sections.map(({ id, items, title }) => (
          <Section
            key={`feed-section-${id}`}
            title={title}
            head={{
              ...Section.defaultProps.head,
              align: "flex-start"
            }}
            padding={["medium", "none", "large", "none"]}
          >
            <Scrollable
              padding="small"
              horizontalPadding="medium"
              maxVisibleItems={2}
            >
              {items.map(({ id, name, cover }, index) => (
                <CardCover
                  title={name}
                  interactions={{
                    primary: {
                      action: {
                        as: "div"
                      },
                      label: "example"
                    }
                  }}
                  media={{
                    source: cover,
                    credits: "",
                    type: "image"
                  }}
                />
              ))}
            </Scrollable>
          </Section>
        ))}
      </AnimatedMinimize>
    </FadePresence>
  );
}

export { Home };
