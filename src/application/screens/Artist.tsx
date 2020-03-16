/** @jsx jsx */
import { useQuery } from "@apollo/react-hooks";
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
  GQLGetArtistQuery,
  GQLGetArtistQueryVariables
} from "../../graphql/generated";
import { useScrollTopOnce } from "../../hooks/use-scroll-top-once";
import { ErrorView } from "../components/ErrorView/ErrorView";
import { Line } from "../components/Line/Line";
import { ObjectDetails } from "../components/ObjectDetails/ObjectDetails";
import { RouteArtistParameters } from "../site-map";

interface ArtistProps extends RouteComponentProps<RouteArtistParameters> {}

function Artist(props: ArtistProps) {
  const {
    match: {
      params: { id }
    }
  } = props;

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
            album {
              name
            }
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
    <ObjectDetails
      backgroundImage={data.artist.cover}
      overlap={
        <Button
          type="primary"
          label="Shuffle Play"
          display="inline"
          size="large"
        />
      }
      head={
        <Fragment>
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
        </Fragment>
      }
    >
      <Section title="Popular" padding="none">
        {data.artist.popular.map((item, index) => (
          <Line
            key={`popular-song-${item.name}-${index}`}
            interaction={{
              label: "Go to TODO",
              action: {
                as: "div"
              }
            }}
            head={<TextLine text={String(index + 1)} />}
          >
            <TextLine text={item.name} />
            <TextLine text={item.album.name} color="foregroundSecondary" />
          </Line>
        ))}
      </Section>
      <Section title="Albums" padding="none">
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
      </Section>
    </ObjectDetails>
  );
}

export { Artist, Artist as default };
