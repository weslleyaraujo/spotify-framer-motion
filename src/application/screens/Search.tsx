import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { Section } from "../../components/molecules/Section/Section";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { Grid } from "../../components/utilities/Grid/Grid";
import { useBodyBackground } from "../../hooks/use-body-background";
import { CategoryCard } from "../components/CardCategory/CardCategory";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { SITEMAP } from "../site-map";
import { useScrollTopOnce } from "../../hooks/use-scroll-top-once";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  GQLGetGenresQueryVariables,
  GQLGetGenresQuery
} from "../../graphql/generated";
import { ErrorView } from "../components/ErrorView/ErrorView";
import { LoadingView } from "../../components/utilities/LoadingView/LoadingView";
import { Global } from "@emotion/core";
import { useTheme } from "emotion-theming";
import { Theme } from "../../foundations/Theme";

interface SearchProps {}

function Search(props: SearchProps) {
  const history = useHistory();
  const theme = useTheme<Theme>();
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
                primary: {
                  label: "Visit page",
                  action: {
                    as: Link,
                    to: "/artist/tame-impala"
                  }
                }
              }}
            />
          ))}
        </Grid>
      </Section>
    </FadePresence>
  );
}

export { Search, Search as default };
