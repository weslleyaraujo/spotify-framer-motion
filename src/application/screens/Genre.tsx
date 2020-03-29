/** @jsx jsx */
import { useQuery } from "@apollo/react-hooks";
import { jsx } from "@emotion/core";
import { gql } from "apollo-boost";
import { RouteComponentProps } from "react-router";
import { LoadingView } from "../../components/utilities/LoadingView/LoadingView";
import {
  GQLGetGenreQuery,
  GQLGetGenreQueryVariables
} from "../../graphql/generated";
import { useBodyBackground } from "../../hooks/use-body-background";
import { ErrorView } from "../components/ErrorView/ErrorView";
import { RouteGenreParameters } from "../site-map";
import { ObjectDetails } from "../components/ObjectDetails/ObjectDetails";
import { Button } from "../../components/molecules/Button/Button";
import { Fragment } from "react";
import { View } from "../../components/atoms/View/View";
import { theme } from "../application-theme";
import { Picture } from "../../components/atoms/Picture/Picture";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { Section } from "../../components/molecules/Section/Section";
import { Line } from "../components/Line/Line";
import { useScrollTopOnce } from "../../hooks/use-scroll-top-once";

interface GenreProps extends RouteComponentProps<RouteGenreParameters> {}

function Genre(props: GenreProps) {
  const {
    match: {
      params: { id }
    }
  } = props;

  useScrollTopOnce();

  const { data, error, loading } = useQuery<
    GQLGetGenreQuery,
    GQLGetGenreQueryVariables
  >(
    gql`
      query GetGenre($id: ID!) {
        genre(id: $id) @client {
          id
          name
          cover
          color {
            start
          }
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

  useBodyBackground({
    color: data?.genre.color.start || "transparent",
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
        <Button
          type="primary"
          label="Shuffle Play"
          display="inline"
          size="large"
        />
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
              source={data.genre.cover}
              alt={data.genre.name}
              width={theme.scales.larger}
              height={theme.scales.larger}
              aspectRatio="square"
            />
          </View>
          <View
            padding={["none", "none", "none"]}
            align="flex-start"
            direction="row"
            style={{
              minHeight: theme.units.larger * 1.2
            }}
          >
            <TextLine
              textAlign="center"
              text={data.genre.name}
              type="heading"
              numberOfLines={1}
            />
          </View>
        </Fragment>
      }
    >
      <Section padding="none">
        {data.genre.songs.map((item, index) => (
          <Line
            key={`genre-song-${item.name}-${index}`}
            interaction={{
              label: "Go to TODO",
              action: {
                as: "div"
              }
            }}
          >
            <TextLine text={item.name} type="strong" />
            <TextLine text={data.genre.name} color="foregroundSecondary" />
          </Line>
        ))}
      </Section>
    </ObjectDetails>
  );
}

export { Genre, Genre as default };
