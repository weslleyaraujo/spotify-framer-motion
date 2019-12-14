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

  const dimensions = 150;

  if (error) {
    return <TextLine text="TODO: ErrorView" />;
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
                  width: dimensions,
                  height: dimensions,
                  overflow: "hidden",
                  borderRadius: "4000px"
                }}
              >
                <Picture
                  alt={data.artist.name}
                  source=""
                  aspectRatio="square"
                  width={dimensions}
                  height={dimensions}
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

        {[...new Array(12)].map((item, key) => (
          <View
            key={key}
            padding={["small", "medium"]}
            justify="space-between"
            align="center"
          >
            <View>
              <Picture
                width={60}
                height={60}
                alt="Music"
                source=""
                aspectRatio="square"
              />
            </View>
            <View flex={1} padding={["small", "medium"]}>
              <TextLine text="Currents" />
              <TextLine text="2015 - Album" color="foregroundSecondary" />
            </View>
          </View>
        ))}
      </AnimatedMinimize>
    </FadePresence>
  );
}

export { Artist, Artist as default };
