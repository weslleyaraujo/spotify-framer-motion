import { useQuery } from "@apollo/react-hooks";
import { Global } from "@emotion/core";
import { gql } from "apollo-boost";
import { useTheme } from "emotion-theming";
import React from "react";
import { useHistory } from "react-router";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { Section } from "../../components/molecules/Section/Section";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { Grid } from "../../components/utilities/Grid/Grid";
import { LoadingView } from "../../components/utilities/LoadingView/LoadingView";
import { Theme } from "../../foundations/Theme";
import {
  GQLGetGenresQuery,
  GQLGetGenresQueryVariables
} from "../../graphql/generated";
import { useBodyBackground } from "../../hooks/use-body-background";
import {
  INTERACTIONS,
  useLazyInteractions
} from "../../hooks/use-interactions";
import { useScrollTopOnce } from "../../hooks/use-scroll-top-once";
import { CategoryCard } from "../components/CardCategory/CardCategory";
import { ErrorView } from "../components/ErrorView/ErrorView";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { SITEMAP } from "../site-map";

interface SearchProps {}

function Search(props: SearchProps) {
  const history = useHistory();
  const theme = useTheme<Theme>();
  const createInteraction = useLazyInteractions();
  useScrollTopOnce();
  useBodyBackground({
    color: "white",
    gradientStyle: "topLeft"
  });

  const { loading, error, data } = useQuery<
    GQLGetGenresQuery,
    GQLGetGenresQueryVariables
  >(gql`
    query GetGenres {
      genres @client {
        id
        name
        cover
        color {
          start
          end
        }
      }
    }
  `);

  if (error) {
    return <ErrorView error={error} />;
  }

  if (loading) {
    return <LoadingView />;
  }

  return (
    <FadePresence>
      <Global
        styles={{
          body: {
            paddingBottom: theme.units.largest * 5
          }
        }}
      />
      <View justify="center" padding={["larger", "large", "none", "large"]}>
        <TextLine text="Search" type="display" color="foregroundPrimary" />
      </View>
      <View margin={["large", "medium", "none", "medium"]}>
        <SearchBar onFocus={event => history.push(SITEMAP.SEARCH_RESULTS)} />
      </View>
      <Section
        titleType="title"
        title="Genres"
        padding="medium"
        head={{
          padding: ["medium", "medium", "none", "medium"],
          justify: "flex-start"
        }}
      >
        <Grid itemsPerRow={2} gap="small">
          {data.genres.map(({ name, id, color, cover }, key) => (
            <CategoryCard
              key={`category-genre-card-${id}-${key}`}
              background={{
                from: color.start,
                to: color.end
              }}
              media={{
                source: cover,
                type: "image",
                credits: "Spotify"
              }}
              title={name}
              interactions={{
                primary: createInteraction(INTERACTIONS.NAVIGATE_GENRE, {
                  id,
                  label: `Go to ${name}`
                })
              }}
            />
          ))}
        </Grid>
      </Section>
    </FadePresence>
  );
}

export { Search, Search as default };
