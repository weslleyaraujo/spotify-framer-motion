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
        {data?.feed.sections.map(item => (
          <Section
            key={`feed-section-${item.id}`}
            title={item.title}
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
              {[...new Array(5)].map((item, index) => (
                <Picture
                  key={`home-section-picture-${index}`}
                  source={
                    Math.random() <= 0.5
                      ? sourceAlbum2
                      : index % 2
                      ? "https://i.scdn.co/image/7f587bc2606cdd9907d7452e92a2158c63fa8a6e?a"
                      : sourceAlbum
                  }
                  alt="Release Radar"
                  aspectRatio="square"
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
