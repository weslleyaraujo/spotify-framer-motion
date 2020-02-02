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

interface SearchProps {}

function Search(props: SearchProps) {
  const history = useHistory();
  useBodyBackground({
    color: "white",
    gradientStyle: "topLeft"
  });

  return (
    <FadePresence>
      <View justify="center" padding={["larger", "large", "none", "large"]}>
        <TextLine text="Search" type="display" color="foregroundPrimary" />
      </View>
      <View margin={["large", "medium", "none", "medium"]}>
        <SearchBar onFocus={event => history.push(SITEMAP.SEARCH_RESULTS)} />
      </View>
      <Section
        titleType="title"
        title="Your top genres"
        padding="medium"
        head={{
          padding: ["medium", "medium", "none", "medium"],
          justify: "flex-start"
        }}
      >
        <Grid itemsPerRow={2} gap="medium">
          {[...new Array(6)].map((item, key) => (
            <CategoryCard
              key={key}
              background={{
                from: "orange",
                to: "pink"
              }}
              media={{
                source: "",
                type: "image",
                credits: "Spotify"
              }}
              title="Indie"
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
