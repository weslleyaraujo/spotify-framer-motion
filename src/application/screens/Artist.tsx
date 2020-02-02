/** @jsx jsx */
import { useQuery } from "@apollo/react-hooks";
import { jsx } from "@emotion/core";
import { gql } from "apollo-boost";
import { useTheme } from "emotion-theming";
import { Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Picture } from "../../components/atoms/Picture/Picture";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { useViewStyles, View } from "../../components/atoms/View/View";
import { Button } from "../../components/molecules/Button/Button";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { LoadingView } from "../../components/utilities/LoadingView/LoadingView";
import { ScaleOut } from "../../components/utilities/ScaleOut/ScaleOut";
import { Theme } from "../../foundations/Theme";
import {
  GQLGetArtistQuery,
  GQLGetArtistQueryVariables,
  GQLGetPopularAlbumQuery,
  GQLGetPopularAlbumQueryVariables
} from "../../graphql/generated";
import { ErrorView } from "../components/ErrorView/ErrorView";
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
      <ScaleOut
        scale={{
          from: [1, 0.8],
          to: [1.06, 1.01]
        }}
        content={
          <div
            css={{
              ...headerStyles,
              paddingBottom: theme.units.larger,
              height: theme.scales.larger * 1.8,
              backgroundImage: `url(${data.artist.cover})`,
              backgroundPosition: "center",
              backgroundSize: "100vw",
              backgroundRepeat: "no-repeat"
            }}
          >
            <View
              justify="center"
              direction="column"
              align="center"
              supportsTruncation
              style={{
                width: "76vw"
              }}
            >
              <TextLine
                textAlign="center"
                text={data.artist.name}
                type="display"
                numberOfLines={2}
              />
              <View margin={["medium", "none"]}>
                <TextLine
                  text={`${data.artist.listeners} MONTHLY LISTENERS`}
                  type="caption"
                  color="foregroundSecondary"
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
            <PopularSong id={item.album} track={item.name} />
          </View>
        ))}
        <div
          style={{
            height: "90vh"
          }}
        />
      </ScaleOut>
    </FadePresence>
  );
}

function PopularSong({ id, track }: { id: string; track: string }) {
  const theme = useTheme<Theme>();
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
    <Fragment>
      <View>
        <Picture
          width={theme.scales.medium}
          height={theme.scales.medium}
          alt="Music"
          source={data.album.cover}
          aspectRatio="square"
        />
      </View>
      <View flex={1} padding={["small", "medium"]}>
        <TextLine text={track} />
        <TextLine text={data.album.name} color="foregroundSecondary" />
      </View>
    </Fragment>
  );
}

export { Artist, Artist as default };
