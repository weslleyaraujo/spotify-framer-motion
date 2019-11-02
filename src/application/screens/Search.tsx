import React from "react";
import { TextLine } from "../../components/atoms/TextLine/TextLine";
import { View } from "../../components/atoms/View/View";
import { useBodyBackground } from "../../hooks/use-body-background";
import { FadePresence } from "../../components/utilities/FadePresence/FadePresence";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { Section } from "../../components/molecules/Section/Section";
import { CategoryCard } from "../components/CardCategory/CardCategory";
import { Grid } from "../../components/utilities/Grid/Grid";

interface Props {}

function Search(props: Props) {
  useBodyBackground({
    color: "white",
    gradientStyle: "topLeft"
  });

  return (
    <FadePresence>
      <View justify="center" padding={["largest", "large", "none", "large"]}>
        <TextLine text="Search" type="display" color="foregroundPrimary" />
      </View>
      <View margin={["large", "medium", "none", "medium"]}>
        <SearchBar />
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
              media={{
                source: "http://placehold.it/200x200",
                type: "image",
                credits: "Spotify"
              }}
              title="Indie"
              interactions={{
                primary: {
                  label: "Visit page",
                  action: {
                    as: "div"
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
