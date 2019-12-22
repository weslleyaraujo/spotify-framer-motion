/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { Picture } from "../../components/atoms/Picture/Picture";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { Button } from "../../components/molecules/Button/Button";
import { AnimatedMinimize } from "../../components/utilities/AnimatedMinimize/AnimatedMinimize";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { Theme } from "../../foundations/Theme";
import { useBodyBackground } from "../../hooks/use-body-background";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  GQLGetArtistQuery,
  GQLGetArtistQueryVariables
} from "../../graphql/generated";
import { RouteComponentProps } from "react-router-dom";
import { RouteArtistParameters } from "../site-map";
import { LoadingView } from "../../components/utilities/LoadingView/LoadingView";
import { ErrorView } from "../components/ErrorView/ErrorView";
import { Fragment } from "react";

interface Props extends RouteComponentProps<RouteArtistParameters> {}

function Artist(props: Props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  useBodyBackground({
    color: "green",
    gradientStyle: "topBottom"
  });

  const { data, error, loading } = useQuery<
    GQLGetArtistQuery,
    GQLGetArtistQueryVariables
  >(
    gql`
      query GetArtist($id: ID!) {
        artist(id: $id) @client {
          id
          name
          cover
          listeners
          popular {
            name
            album
          }
        }
      }
    `,
    {
      variables: {
        id
      }
    }
  );

  const theme = useTheme<Theme>();

  if (error) {
    return <ErrorView error={error} />;
  }

  if (loading) {
    return <LoadingView />;
  }

  if (!data) {
    return null; // TODO
  }

  return (
    <FadePresence>
      <AnimatedMinimize
        content={
          <View padding={["none", "none", "largest", "none"]}>
            <View
              padding={["larger", "large", "medium"]}
              justify="center"
              align="center"
            >
              <div
                style={{
                  overflow: "hidden",
                  borderRadius: "4000px"
                }}
              >
                <Picture
                  alt={data.artist.name}
                  source={data.artist.cover}
                  aspectRatio="square"
                  width={theme.scales.larger}
                  height={theme.scales.larger}
                />
              </div>
            </View>
            <View justify="center" direction="column" align="center">
              <TextLine text={data.artist.name} type="heading" />
              <View margin={["medium", "none"]}>
                <TextLine
                  text={`${data.artist.listeners} MONTHLY LISTENERS`}
                  type="caption"
                  color="foregroundSecondary"
                />
              </View>
            </View>
          </View>
        }
      >
        <View justify="center" direction="column" align="center">
          <div
            css={{
              position: "relative",
              top: `-${theme.units.larger}px`
            }}
          >
            <Button
              type="primary"
              label="Shuffle Play"
              display="inline"
              size="large"
            />
          </div>
          <View align="center">
            <TextLine text="Popular" />
          </View>
        </View>
        {data.artist.popular.map((item, key) => (
          <View
            key={key}
            padding={["small", "medium"]}
            justify="space-between"
            align="center"
          >
            <View>
              <Picture
                width={theme.scales.medium}
                height={theme.scales.medium}
                alt="Music"
                source=""
                aspectRatio="square"
              />
            </View>
            <View flex={1} padding={["small", "medium"]}>
              <TextLine text={item.name} />
              <TextLine text="2015 - Album" color="foregroundSecondary" />
            </View>
          </View>
        ))}
      </AnimatedMinimize>
    </FadePresence>
  );
}

function PopularSong({ id, name }: { id: string; name: string }) {
  const theme = useTheme<Theme>();
  const {} = useQuery(gql);
  return (
    <Fragment>
      <View>
        <Picture
          width={theme.scales.medium}
          height={theme.scales.medium}
          alt="Music"
          source=""
          aspectRatio="square"
        />
      </View>
      <View flex={1} padding={["small", "medium"]}>
        {/* <TextLine text={item.name} /> */}
        <TextLine text="2015 - Album" color="foregroundSecondary" />
      </View>
    </Fragment>
  );
}

export { Artist, Artist as default };
