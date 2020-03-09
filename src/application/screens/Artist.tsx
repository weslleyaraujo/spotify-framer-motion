/** @jsx jsx */
import { useQuery } from "@apollo/react-hooks";
import { jsx } from "@emotion/core";
import { gql } from "apollo-boost";
import { useTheme } from "emotion-theming";
import { transparentize } from "polished";
import { RouteComponentProps } from "react-router-dom";
import { Picture } from "../../components/atoms/Picture/Picture";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { useViewStyles, View } from "../../components/atoms/View/View";
import { Button } from "../../components/molecules/Button/Button";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { LoadingView } from "../../components/utilities/LoadingView/LoadingView";
import { ScaleOut } from "../../components/utilities/ScaleOut/ScaleOut";
import { Layers } from "../../foundations/Layers";
import { Theme } from "../../foundations/Theme";
import {
  GQLGetArtistQuery,
  GQLGetArtistQueryVariables,
  GQLGetPopularAlbumQuery,
  GQLGetPopularAlbumQueryVariables
} from "../../graphql/generated";
import { useScrollTopOnce } from "../../hooks/use-scroll-top-once";
import { ErrorView } from "../components/ErrorView/ErrorView";
import { Line } from "../components/Line/Line";
import { RouteArtistParameters } from "../site-map";

interface ArtistProps extends RouteComponentProps<RouteArtistParameters> {}

function Artist(props: ArtistProps) {
  const {
    match: {
      params: { id }
    }
  } = props;

  const headerStyles = useViewStyles({
    padding: "none",
    margin: "none",
    justify: "center",
    align: "flex-end"
  });

  useScrollTopOnce();

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
          albums {
            id
            name
            cover
          }
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
      <ScaleOut
        scale={{
          from: [1, 0.8],
          to: [1.06, 1.01]
        }}
        content={
          <div
            css={{
              ...headerStyles,
              label: "background",
              paddingBottom: theme.units.larger,
              height: theme.scales.larger * 2.3,
              backgroundImage: `url(${data.artist.cover})`,
              backgroundPosition: "top center",
              backgroundSize: "100vw",
              backgroundRepeat: "no-repeat",
              "&:after": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: transparentize(0.7, theme.colors.background),
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: Layers.Root
              }
            }}
          >
            <View
              justify="center"
              direction="column"
              align="center"
              supportsTruncation
              style={{
                width: "76vw",
                position: "relative",
                zIndex: Layers.Root + 10
              }}
            >
              <TextLine
                textAlign="center"
                text={data.artist.name}
                type="display"
                numberOfLines={2}
              />
              <View margin={["large", "none"]}>
                <TextLine
                  text={`${data.artist.listeners} MONTHLY LISTENERS`}
                  type="caption"
                  color="foregroundPrimary"
                />
              </View>
            </View>
          </div>
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
            <TextLine text="Popular" type="heading" />
          </View>
        </View>
        {data.artist.popular.map((item, index) => (
          <PopularSong
            id={item.album}
            track={item.name}
            index={index + 1}
            key={`${item.name}-${index}`}
          />
        ))}

        <View>
          <View justify="center" margin={["none", "large", "none"]}>
            <TextLine text="Albums" type="heading" textAlign="center" />
          </View>
          {data.artist.albums.map((item, index) => (
            <Line
              key={`${item.id}-${index}`}
              interaction={{
                label: "Go to TODO",
                action: {
                  as: "div"
                }
              }}
              head={
                <Picture
                  width={theme.scales.large}
                  height={theme.scales.large}
                  alt="Music"
                  source={item.cover}
                  aspectRatio="square"
                />
              }
            >
              <TextLine text={item.name} type="title" />
              <TextLine text="Album" color="foregroundSecondary" />
            </Line>
          ))}
        </View>
      </ScaleOut>
    </FadePresence>
  );
}

function PopularSong({
  id,
  index,
  track
}: {
  id: string;
  track: string;
  index: number;
}) {
  const { data, loading, error } = useQuery<
    GQLGetPopularAlbumQuery,
    GQLGetPopularAlbumQueryVariables
  >(
    gql`
      query GetPopularAlbum($id: ID!) {
        album(id: $id) @client {
          cover
          name
        }
      }
    `,
    {
      variables: {
        id
      }
    }
  );

  if (loading || error || !data) {
    return null;
  }

  return (
    <Line
      interaction={{
        label: "Go to TODO",
        action: {
          as: "div"
        }
      }}
      head={<TextLine text={String(index)} />}
    >
      <TextLine text={track} />
      <TextLine text={data.album.name} color="foregroundSecondary" />
    </Line>
  );
}

export { Artist, Artist as default };
