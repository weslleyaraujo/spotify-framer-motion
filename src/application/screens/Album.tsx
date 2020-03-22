/** @jsx jsx */
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { jsx } from "@emotion/core";
import { gql } from "apollo-boost";
import { useTheme } from "emotion-theming";
import { Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Picture } from "../../components/atoms/Picture/Picture";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { Button } from "../../components/molecules/Button/Button";
import { Section } from "../../components/molecules/Section/Section";
import { LoadingView } from "../../components/utilities/LoadingView/LoadingView";
import { Theme } from "../../foundations/Theme";
import {
  GQLGetAlbumQuery,
  GQLGetAlbumQueryVariables,
  GQLGetLazyArtistQuery,
  GQLGetLazyArtistQueryVariables
} from "../../graphql/generated";
import { useScrollTopOnce } from "../../hooks/use-scroll-top-once";
import { ErrorView } from "../components/ErrorView/ErrorView";
import { Line } from "../components/Line/Line";
import { ObjectDetails } from "../components/ObjectDetails/ObjectDetails";
import { RouteAlbumParameters } from "../site-map";
import { useBodyBackground } from "../../hooks/use-body-background";

interface AlbumProps extends RouteComponentProps<RouteAlbumParameters> {}

function Album(props: AlbumProps) {
  const {
    match: {
      params: { id }
    }
  } = props;

  useScrollTopOnce();

  const [fetchArtist, { called, data: artistData }] = useLazyQuery<
    GQLGetLazyArtistQuery,
    GQLGetLazyArtistQueryVariables
  >(gql`
    query GetLazyArtist($id: ID!) {
      artist(id: $id) @client {
        id
        name
      }
    }
  `);

  const { data, error, loading } = useQuery<
    GQLGetAlbumQuery,
    GQLGetAlbumQueryVariables
  >(
    gql`
      query GetAlbum($id: ID!) {
        album(id: $id) @client {
          id
          name
          cover
          artist
          songs {
            id
            name
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

  if (!called && data?.album.artist) {
    fetchArtist({
      variables: {
        id: data.album.artist
      }
    });
  }

  const theme = useTheme<Theme>();
  useBodyBackground({
    color: "yellow",
    gradientStyle: "topBottom"
  });

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
    <ObjectDetails
      overlap={
        <Fragment>
          <Button
            type="primary"
            label="Shuffle Play"
            display="inline"
            size="large"
          />
        </Fragment>
      }
      head={
        <Fragment>
          <View
            padding={["none", "none", "medium"]}
            css={{
              height: theme.scales.large
            }}
          >
            <Picture
              source={data.album.cover}
              alt={data.album.name}
              width={theme.scales.larger}
              height={theme.scales.larger}
              aspectRatio="square"
            />
          </View>
          <View margin={["none", "none", "large"]}>
            <TextLine
              textAlign="center"
              text={data.album.name}
              type="heading"
              numberOfLines={1}
            />
            <TextLine
              text={`Album by ${artistData?.artist.name}`}
              color="foregroundSecondary"
            />
          </View>
        </Fragment>
      }
    >
      <Section padding="none">
        {data.album.songs.map((item, index) => (
          <Line
            key={`popular-song-${item.name}-${index}`}
            interaction={{
              label: "Go to TODO",
              action: {
                as: "div"
              }
            }}
          >
            <TextLine text={item.name} type="strong" />
            <TextLine
              text={artistData?.artist.name}
              color="foregroundSecondary"
            />
          </Line>
        ))}
      </Section>
    </ObjectDetails>
  );
}

export { Album, Album as default };
